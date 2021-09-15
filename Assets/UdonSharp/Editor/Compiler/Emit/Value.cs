﻿
using System;
using UdonSharp.Compiler.Symbols;

#if UDONSHARP_DEBUG
using System.Collections.Generic;
using Debug = UnityEngine.Debug;
#endif

namespace UdonSharp.Compiler.Emit
{
    /// <summary>
    /// Represents a value that needs to be stored on the heap for a constant, user field/local variable, or internally generated value for expression results
    /// </summary>
    internal class Value
    {
        [Flags]
        public enum ValueFlags
        {
            /// <summary>
            /// Variable generated as an intermediate variable that stores intermediate calculations
            /// </summary>
            Internal = 1,
            /// <summary>
            /// A variable generated that's used for some operation which we do not want to share with other internal variables
            /// This is usually used for internals that are partially initialized before being used where we don't want their partially initialized state to be trampled
            /// </summary>
            InternalGlobal = 1 << 1,
            /// <summary>
            /// Variable declared by the user as a public field on a class
            /// </summary>
            Field = 1 << 2,
            /// <summary>
            /// Declared by the user as a variable local to a specific scope
            /// </summary>
            Local = 1 << 4,
            /// <summary>
            /// Used to represent a constant value set by the compiler that does not change after compile time. Variables with readonly use the Readonly flag.
            /// </summary>
            Constant = 1 << 5,
            /// <summary>
            /// Defines one of the 3 builtin `this` assignments for UdonBehaviour, GameObject, and Transform
            /// </summary>
            UdonThis = 1 << 6,
            /// <summary>
            /// This variable used for tracking the instance we are operating on when working with exported types that are stored as object[]
            /// </summary>
            This = 1 << 7,
            /// <summary>
            /// Metadata information generated by U# for type checking and basic type info
            /// </summary>
            Reflection = 1 << 8,
            /// <summary>
            /// Variables marked readonly, cannot be written to outside of constructors
            /// </summary>
            Readonly = 1 << 9,
            /// <summary>
            /// Method and property parameter values
            /// </summary>
            Parameter = 1 << 10,
            /// <summary>
            /// Udon built-in heap values used for passing values to events and returning from things such as OnOwnershipTransferRequest
            /// </summary>
            BuiltinVar = 1 << 11,
            /// <summary>
            /// Internal symbols generated for user-defined auto properties
            /// </summary>
            PropertyBackingField = 1 << 12,
        }
        
        /// <summary>
        /// The type of this value as specified by the user
        /// </summary>
        public TypeSymbol UserType { get; }

        public ExternTypeSymbol UdonType => UserType.UdonType;
        
        public string UniqueID { get; }
        
        public ValueFlags Flags { get; private set; }
        public bool IsConstant => (Flags & ValueFlags.Constant) != 0;
        public bool IsLocal => (Flags & ValueFlags.Local) != 0;
        public bool IsInternal => (Flags & ValueFlags.Internal) != 0 || (Flags & ValueFlags.InternalGlobal) != 0;

        public object DefaultValue { get; set; }

        private ValueTable _parentTable;
        private CowValueInternalTracker _cowTracker;
        
        public Symbol AssociatedSymbol { get; private set; }
        
        public Value(ValueTable parentTable, string uniqueID, TypeSymbol userType, ValueFlags flags)
        {
        #if UDONSHARP_DEBUG
            if (parentTable == null)
                throw new NullReferenceException();
        #endif
            
            _parentTable = parentTable;
            UserType = userType;
            Flags = flags;
            UniqueID = uniqueID;
        }

        public void MarkReadOnly()
        {
            Flags |= ValueFlags.Readonly;
        }

        public string GetDeclarationStr()
        {
            return $"{UniqueID}: %{UserType.UdonType.ExternSignature}, {((Flags & ValueFlags.UdonThis) != 0 ? "this" : "null")}";
        }

        public void SetAssociatedSymbol(Symbol symbol)
        {
            if (symbol == null)
                throw new NullReferenceException();
            
            AssociatedSymbol = symbol;
        }

        public override string ToString()
        {
            if ((Flags & ValueFlags.Constant) != 0)
                return $"Constant {UserType} Value: {DefaultValue}" + ((DefaultValue is uint uintVal) ? $" (0x{uintVal:X8})" : "");
            
            return $"{UniqueID}: {UserType} Value, flags {Flags}";
        }

        public void MarkDirty()
        {
            if (_cowTracker != null)
            {
                _cowTracker.MarkDirty();
            }
        }

        public CowValue GetCowValue(EmitContext context)
        {
            if (_cowTracker != null)
            {
                if (_cowTracker.IsDirty || _cowTracker.ReferenceCount == 0)
                    _cowTracker = null;
                else
                    return new CowValue(_cowTracker);
            }

            _cowTracker = new CowValueInternalTracker(context, this);
            return new CowValue(_cowTracker);
        }

        internal class CowValueInternalTracker
        {
            private Value SourceValue { get; }
            private EmitContext DeclaredContext { get; }
            private ValueTable DeclaredTable { get; }
            public Value Value { get; private set; }

            public bool IsDirty { get; private set; }
            public int ReferenceCount { get; private set; }

        #if UDONSHARP_DEBUG
            private HashSet<CowValue> _referenceHolders = new HashSet<CowValue>();
        #endif
            
            public CowValueInternalTracker(EmitContext context, Value sourceValue)
            {
                Value = SourceValue = sourceValue;
                DeclaredContext = context;
                DeclaredTable = context.TopTable;
            }

            public void MarkDirty()
            {
                if (ReferenceCount == 0)
                {
                    IsDirty = true;
                    Value = null;
                    return;
                }

                if (IsDirty) return;
                
                Value temp = DeclaredContext.CreateInternalValue(SourceValue.UserType);
                DeclaredContext.Module.AddCommentTag("Cow dirty");
                DeclaredContext.Module.AddCopy(Value, temp);
                Value = temp;
                IsDirty = true;
            }

            public void AddRef(CowValue value)
            {
                ReferenceCount++;
            #if UDONSHARP_DEBUG
                _referenceHolders.Add(value);
            #endif
                
                if (DeclaredContext.TopTable != DeclaredTable)
                {
                    throw new Exception($"CowValueInternalTracker for {SourceValue} has had ref added from different symbol table scope.");
                }
            }

            public void ClearRef(CowValue value)
            {
                ReferenceCount--;
                // Debug.Log($"Clearing ref for {value.Value}, new ref count {ReferenceCount}\n{new StackTrace()}");
                
            #if UDONSHARP_DEBUG
                if (!_referenceHolders.Remove(value))
                {
                    throw new Exception("No matching holder for COWValue");
                }
            #endif
                
                if (DeclaredContext.TopTable != DeclaredTable)
                {
                    throw new Exception($"CowValueInternalTracker for {SourceValue} has had ref added from different symbol table scope.");
                }
            }
        }

        internal class CowValue : IDisposable
        {
            private readonly CowValueInternalTracker _tracker;
            private bool _disposed;

            public Value Value => _tracker.Value;

            internal CowValue(CowValueInternalTracker tracker)
            {
                _tracker = tracker;
                _tracker.AddRef(this);
            }

        #if UDONSHARP_DEBUG
            ~CowValue()
            {
                if (!_disposed)
                    Debug.LogError("Did not dispose CowValue for " + Value.UniqueID);
            }
        #endif

            public void Dispose()
            {
                if (_disposed)
                    return;
                
                _tracker.ClearRef(this);
                _disposed = true;
            }
        }
    }
}

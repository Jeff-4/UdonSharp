﻿
using Microsoft.CodeAnalysis;
using System.Linq;
using UdonSharp.Compiler.Assembly;
using UdonSharp.Compiler.Binder;
using UdonSharp.Compiler.Emit;
using UdonSharp.Compiler.Udon;
using UdonSharp.Core;
using UdonSharp.Localization;


namespace UdonSharp.Compiler.Symbols
{
    internal class UdonSharpBehaviourMethodSymbol : MethodSymbol
    {
        public ExportAddress ExportedMethodAddress { get; }
        
        public bool IsUdonEvent { get; }
        
        public bool NeedsExportFromReference { get; private set; }

        /// <summary>
        /// Marks the symbol as one that's referenced from some behaviour non-locally
        /// This allows private/protected/internal methods to be called from behaviours that have the access permissions
        /// </summary>
        public void MarkNeedsReferenceExport() => NeedsExportFromReference = true;
        
        public UdonSharpBehaviourMethodSymbol(IMethodSymbol sourceSymbol, AbstractPhaseContext context)
            : base(sourceSymbol, context)
        {
            IsUdonEvent = CompilerUdonInterface.IsUdonEvent(sourceSymbol.Name);
            ExportedMethodAddress = new ExportAddress(ExportAddress.AddressKind.String, this);
        }

        public override void Bind(BindContext context)
        {
            IMethodSymbol symbol = RoslynSymbol;

            if (symbol.MethodKind == MethodKind.Constructor && !symbol.IsImplicitlyDeclared)
                throw new NotSupportedException(LocStr.CE_UdonSharpBehaviourConstructorsNotSupported, symbol.Locations.FirstOrDefault());
            if (symbol.IsGenericMethod)
                throw new NotSupportedException(LocStr.CE_UdonSharpBehaviourGenericMethodsNotSupported, symbol.Locations.FirstOrDefault());

            base.Bind(context);
        }

        public override void Emit(EmitContext context)
        {
            EmitContext.MethodLinkage methodLinkage = context.GetMethodLinkage(this, false);
            
            if (context.MethodNeedsExport(this))
            {
                ExportedMethodAddress.ResolveAddress(methodLinkage.MethodExportName);
                context.Module.AddExportTag(this);
            }

            var returnAddressConst = context.GetConstantValue(context.GetTypeSymbol(SpecialType.System_UInt32), 0xFFFFFFFF);
            context.Module.AddPush(returnAddressConst);

            base.Emit(context);
        }
    }
}

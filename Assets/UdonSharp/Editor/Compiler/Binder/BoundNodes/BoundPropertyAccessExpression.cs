﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.CodeAnalysis;
using UdonSharp.Compiler.Emit;
using UdonSharp.Compiler.Symbols;
using UnityEngine;
using VRC.Udon.Common.Interfaces;

namespace UdonSharp.Compiler.Binder
{
    internal abstract class BoundPropertyAccessExpression : BoundAccessExpression
    {
        protected PropertySymbol Property { get; }

        private BoundExpression[] ParameterExpressions { get; }

        public override TypeSymbol ValueType => Property.Type;
        
        protected BoundPropertyAccessExpression(AbstractPhaseContext context, SyntaxNode node, PropertySymbol property, BoundExpression sourceExpression, BoundExpression[] parameterExpressions)
            : base(node, sourceExpression)
        {
            Property = property;
            ParameterExpressions = parameterExpressions;
        }

        private BoundExpression[] GetParameters(EmitContext context, BoundExpression valueExpression = null)
        {
            Value.CowValue[] propertyParams = context.GetExpressionCowValues(this, "propertyParams");

            if (propertyParams == null)
            {
                if (ParameterExpressions != null)
                {
                    propertyParams = new Value.CowValue[ParameterExpressions.Length];

                    for (int i = 0; i < propertyParams.Length; ++i)
                        propertyParams[i] = context.EmitValue(ParameterExpressions[i]).GetCowValue(context);
                }
                else
                {
                    propertyParams = new Value.CowValue[0];
                }

                context.RegisterCowValues(propertyParams, this, "propertyParams");
            }

            var expressions = new List<BoundExpression>();
            expressions.AddRange(propertyParams.Select(BindAccess));
            if (valueExpression != null)
                expressions.Add(valueExpression);

            return expressions.ToArray();
        }

        private BoundExpression GetInstanceExpression(EmitContext context)
        {
            if (SourceExpression == null)
                return null;

            Value.CowValue[] instance = context.GetExpressionCowValues(this, "propertyInstance");

            if (instance == null)
            {
                instance = new[] {context.EmitValue(SourceExpression).GetCowValue(context)};
                context.RegisterCowValues(instance, this, "propertyInstance");
            }

            return BindAccess(instance[0]);
        }

        public override Value EmitValue(EmitContext context)
        {
            var invocationExpression = BoundInvocationExpression.CreateBoundInvocation(context, SyntaxNode, Property.GetMethod,
                GetInstanceExpression(context), GetParameters(context));

            return context.EmitValue(invocationExpression);
        }

        public override Value EmitSet(EmitContext context, BoundExpression valueExpression)
        {
            var invocationExpression = BoundInvocationExpression.CreateBoundInvocation(context, SyntaxNode,
                Property.SetMethod,
                GetInstanceExpression(context), GetParameters(context, valueExpression));
            
            invocationExpression.MarkPropertySetter();
            
            return context.EmitValue(invocationExpression);
        }

        private static readonly HashSet<Type> _allowedConstantPropertyTypes = new HashSet<Type>()
        {
            typeof(Vector2),
            typeof(Vector3),
            typeof(Vector4),
            typeof(Quaternion),
            typeof(Matrix4x4),
            typeof(Color),
            typeof(Mathf),
            typeof(Rect),
        };

        public static BoundAccessExpression BindPropertyAccess(AbstractPhaseContext context, SyntaxNode node, PropertySymbol propertySymbol, BoundExpression sourceExpression, BoundExpression[] parameterExpressions = null)
        {
            if (propertySymbol is ExternPropertySymbol externProperty)
            {
                Type propertyType = externProperty.ContainingType.UdonType.SystemType;

                if (_allowedConstantPropertyTypes.Contains(propertyType))
                {
                    PropertyInfo property = propertyType.GetProperty(externProperty.Name,
                        BindingFlags.Static | BindingFlags.Public);

                    if (property != null)
                        return new BoundConstantExpression(property.GetValue(null), propertySymbol.Type);
                }

                if (propertySymbol.ToString() == "UnityEngine.Behaviour.enabled")
                {
                    return new BoundEnabledPropertyExternAccessExpression(context, node, sourceExpression);
                }
                
                return new BoundExternPropertyAccessExpression(context, node, externProperty, sourceExpression, parameterExpressions);
            }

            throw new NotImplementedException();
        }

        private sealed class BoundExternPropertyAccessExpression : BoundPropertyAccessExpression
        {
            public BoundExternPropertyAccessExpression(AbstractPhaseContext context, SyntaxNode node, ExternPropertySymbol property, BoundExpression sourceExpression, BoundExpression[] parameterExpressions) 
                : base(context, node, property, sourceExpression, parameterExpressions)
            {
            }

            /// <summary>
            /// Optimize self refs to gameObject and transform since Udon supplies them
            /// </summary>
            /// <param name="context"></param>
            /// <returns></returns>
            private Value TryHandleUnityEngineSelfReference(EmitContext context)
            {
                string propertyStr = Property.ToString();
                if (propertyStr != "UnityEngine.Component.transform" &&
                    propertyStr != "UnityEngine.Component.gameObject")
                    return null;

                if (SourceExpression != null && !SourceExpression.IsThis)
                    return null;

                return context.GetUdonThisValue(Property.Type);
            }

            public override Value EmitValue(EmitContext context)
            {
                Value returnValue = TryHandleUnityEngineSelfReference(context);
                
                if (returnValue != null)
                    return returnValue;

                return base.EmitValue(context);
            }
        }

        /// <summary>
        /// Handles how Udon does not expose the base Behaviour.enabled, but exposes the derived versions
        /// </summary>
        private sealed class BoundEnabledPropertyExternAccessExpression : BoundPropertyAccessExpression
        {
            public override TypeSymbol ValueType { get; }

            public BoundEnabledPropertyExternAccessExpression(AbstractPhaseContext context, SyntaxNode node, BoundExpression sourceExpression) 
                : base(context, node, BuildProperty(context, sourceExpression), sourceExpression, null)
            {
                ValueType = context.GetTypeSymbol(SpecialType.System_Boolean);
            }
            
            private static PropertySymbol BuildProperty(AbstractPhaseContext context, BoundExpression sourceExpression)
            {
                TypeSymbol propertyType = sourceExpression.ValueType;

                if (propertyType.UdonType.ExternSignature == "VRCUdonUdonBehaviour")
                    propertyType = context.GetTypeSymbol(typeof(IUdonEventReceiver));
                
                TypeSymbol boolType = context.GetTypeSymbol(SpecialType.System_Boolean);
                MethodSymbol setMethod = new ExternSynthesizedMethodSymbol(context, "set_enabled", propertyType,
                    new[] {boolType}, null, false);
                MethodSymbol getMethod = new ExternSynthesizedMethodSymbol(context, "get_enabled", propertyType,
                    new TypeSymbol[] {}, boolType, false);

                return new SynthesizedPropertySymbol(context, getMethod, setMethod);
            }
        }
    }
}

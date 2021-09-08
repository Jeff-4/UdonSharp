﻿
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Linq;
using UdonSharp.Compiler.Binder;
using UnityEngine;

namespace UdonSharp.Compiler.Symbols
{
    internal class FieldSymbol : Symbol
    {
        public TypeSymbol Type { get; protected set; }
        public ExpressionSyntax InitializerSyntax { get; private set; }
        
        public BoundExpression InitializerExpression { get; private set; }

        protected FieldSymbol(IFieldSymbol sourceSymbol, AbstractPhaseContext bindContext)
            :base(sourceSymbol, bindContext)
        {
            ContainingType = bindContext.GetTypeSymbol(sourceSymbol.ContainingType);
            Type = bindContext.GetTypeSymbol(RoslynSymbol.Type);
        }

        public new IFieldSymbol RoslynSymbol => (IFieldSymbol)base.RoslynSymbol;

        public bool IsConst => RoslynSymbol.IsConst;
        public bool IsReadonly => RoslynSymbol.IsReadOnly;

        private bool _resolved;
        public override bool IsBound => _resolved;

        public override void Bind(BindContext context)
        {
            if (IsBound)
                return;
            
            InitializerSyntax = (RoslynSymbol.DeclaringSyntaxReferences.First().GetSyntax() as VariableDeclaratorSyntax)?.Initializer?.Value;
            // Re-get the type symbol to register it as a dependency in the bind context
            context.GetTypeSymbol(RoslynSymbol.Type);

            if (InitializerSyntax != null)
            {
                BinderSyntaxVisitor bodyVisitor = new BinderSyntaxVisitor(this, context);
                InitializerExpression = (BoundExpression) bodyVisitor.Visit(InitializerSyntax);
            }

            _resolved = true;
        }
    }
}

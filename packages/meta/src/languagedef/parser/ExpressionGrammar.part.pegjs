// These are the parsing rules for the expressions over the language structure,
// as defined in meta/src/languagedef/metalanguage/PiLangExpressions.ts
// They are not meant to be used separately, they should be used in the parser for 
// projectIt parts that use the language expressions.
// Because they are common they are developed and tested separately, together with the
// creator functions in LanguageExpressionCreators.ts.

LanguageExpressions_Definition
  = ws "expressions" ws "for" ws "language" ws languageName:var ws cr:(conceptExps)*
    {
        return expCreate.createTest({
            "languageName": languageName,
            "conceptExps": cr,
        });
    } 

conceptExps = conceptRef:conceptRef ws curly_begin ws exps:expWithSeparator* curly_end 
    { 
        return expCreate.createConceptExps({ 
          "conceptRef": conceptRef, 
          "exps": exps,
        }); 
    }

conceptRef = name:var { return expCreate.createConceptReference( { "name": name}); }

expWithSeparator = exp:langRefExpression semicolon_separator { return exp; }

// the following rules should be part of a parser that wants to use PiLangExpressions.ts
langRefExpression = enumRefExpression:enumRefExpression    { return enumRefExpression; } 
                  / expression:expression                  { return expression; }
                  / functionExpression:functionExpression  { return functionExpression; }

enumRefExpression = sourceName:var ':' appliedfeature:var {
  return expCreate.createEnumReference ({
    "sourceName": sourceName,
    "appliedfeature": appliedfeature
  })
}

expression = sourceName:var appliedfeature:dotExpression {
  return expCreate.createExpression ({
    "sourceName": sourceName,
    "appliedfeature": appliedfeature
  })
}

functionExpression = sourceName:var round_begin actualparams:(
      head:langRefExpression
      tail:(comma_separator v:langRefExpression { return v; })*
      { return [head].concat(tail); }
    ) 
    round_end {
  return expCreate.createFunctionCall ({
    "sourceName": sourceName,
    "actualparams": actualparams
  })
}

dotExpression = '.' sourceName:var appliedfeature:dotExpression?  {
  return expCreate.createAppliedFeatureExp
( {
    "sourceName": sourceName,
    "appliedfeature": appliedfeature
  })
}

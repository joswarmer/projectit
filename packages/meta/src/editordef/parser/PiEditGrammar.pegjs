{
    let creator = require("./PiEditCreators");
    let expCreate = require("../../languagedef/parser/ExpressionCreators");
}

Editor_Definition
  = ws "editor" ws name:var ws "for" ws "language" ws languageName:var ws concepts:(conceptEditor)* ws
    {
        return creator.createLanguageEditor({
            "name"          : name,
            "languageName"  : languageName,
            "conceptEditors": concepts,
            "location": location()
        });
    } 
conceptEditor =
            concept:conceptRef curly_begin ws
                projection:projection?
                trigger:trigger?
                symbol:symbol?
            curly_end
{
    return creator.createConceptEditor({
        "concept"   : concept,
        "trigger"   : trigger,
        "symbol"    : symbol,
        "projection": projection,
        "location": location()
    });
}

projection = "@projection" ws name:var? projection_begin
                   lines:line*
              projection_end
              {
                    return creator.createProjection({ "lines" : lines, "name": name, "location": location() });
              }

templateSpace = s:[ ]+
                {
                    return creator.createIndent( { "indent": s.join(""), "location": location() });
                }

property_projection = propProjectionStart ws
                     exp:expression ws join:listJoin? keyword:keywordDecl? ws
                 propProjectionEnd
            {
                return creator.createPropertyProjection( {  "expression": exp, "listJoin": join, "keyword":keyword, "location": location() });
            }

//property_projection = "[[" ws "this" ws "." ws prop:var ws
//                        join:listJoin?
//                 "]]"
//            {
//                return creator.createSubProjection( { "propertyName": prop, "listJoin": join, "location": location() });
//            }
keywordDecl = "@keyword" ws text:joinText {return text;}

listJoin =  l:listJoinSimple+
                {
                    let directionObject = l.find(j => !!j.direction);
                    let joinTypeObject  = l.find(j => !!j.joinType);
                    let joinTextObject  = l.find(j => !!j.joinText);

                    return creator.createListJoin( {"direction": (!!directionObject ? directionObject.direction : undefined),
                                                    "joinType" : (!!joinTypeObject ? joinTypeObject.joinType    : undefined),
                                                    "joinText" : (!!joinTextObject ? joinTextObject.joinText    : undefined),
                                                    "location": location()} );
                }

listJoinSimple =      (direction:direction  { return {"direction" : direction, "location": location() }; } )
                    / (type:listJoinType    { return {"joinType"  : type, "location": location()      }; } )
                    / (t:joinText           { return {"joinText"  : t, "location": location()         }; } )

joinText = "[" t:anythingButEndBracket* "]" ws
            {
                return t.join("");
            }

direction = dir:("@horizontal" / "@vertical") ws
                {
                    return creator.createListDirection( {"direction": dir, "location": location() } );
                }

listJoinType = joinType:("@separator" / "@terminator") ws
                {
                    return creator.createJoinType( {"type": joinType, "location": location() } );
                }

//projectionexpression  = "${" t:var "}"
//                {
//                    return creator.createPropertyRef( { "propertyName": t, "location": location() });
//                }

propProjectionStart = "${"
propProjectionEnd = "}"

text        = chars:anythingBut+
            {
                return creator.createText( chars.join("") );
             }

anythingButEndBracket = !("]" ) src:sourceChar
            {
                return src;
            }

anythingBut = !("${" / newline / "]" / "[" ) src:char
            {
                return src;
            }

sourceChar = .

newline     = "\r"? "\n"
                {
                    return creator.createNewline();
                }

line        = items:(s:templateSpace / t:text / p:property_projection / sub:subProjection /  w:newline )+
                {
                    return creator.createLine( {"items": items} );
                }

subProjection = projection_begin
                    optional:"?"?
                    items:(s:templateSpace / t:text / p:property_projection )+
                projection_end
                {
                    return creator.createSubProjection( {"optional": optional, "items": items} );
                }

conceptReference = referredName:var {
    return expCreator.createConceptReference({"name": referredName, "location": location()})
}

trigger = "@trigger" ws "\"" value:string "\"" ws
    {
        return value
    }
symbol = "@symbol" ws "\"" value:string "\"" ws
    {
        return value
    }
priority = "priority" ws ":" ws "\"" value:string "\"" ws
    {
        return value
    }

projection_begin    = ws "["
projection_end      = "]" ws

// These are the parsing rules for the expressions over the language structure,
// as defined in meta/src/languagedef/metalanguage/PiLangExpressions.ts
// They are not meant to be used separately, they should be used in the parser for 
// projectIt parts that use the language expressions.
// Because they are common they are developed and tested separately, together with the
// creator functions in LanguageExpressionCreators.ts.

// the following rules should be part of a parser that wants to use PiLangExpressions.ts

conceptRef = name:var { return expCreate.createClassifierReference( { "name": name, "location":location()}); }

langExpression = functionExpression:functionExpression  { return functionExpression; }
               / instanceExpression:instanceExpression  { return instanceExpression; }
               / expression:expression                  { return expression; }
               / simpleExpression:simpleExpression      { return simpleExpression; }

instanceExpression = conceptName:var ':' instance:var
    {
        return expCreate.createInstanceExp ({
            "sourceName": conceptName,
            "instanceName": instance,
            "location": location()
        })
    }

expression = sourceName:var appliedfeature:dotExpression
            {
                return expCreate.createExpression ({
                    "sourceName": sourceName,
                    "appliedfeature": appliedfeature,
                    "location": location()
                })
            }
            / sourceName:var
            {
                return expCreate.createExpression ({
                    "sourceName": sourceName,
                    "location": location()
                })
            }

dotExpression = '.' sourceName:var appliedfeature:dotExpression?  {
  return expCreate.createAppliedFeatureExp
( {
    "sourceName": sourceName,
    "appliedfeature": appliedfeature,
    "location": location()
  })
}

functionExpression = sourceName:var round_begin actualparams:(
      head:langExpression
      tail:(comma_separator v:langExpression { return v; })*
      { return [head].concat(tail); }
    )?
    round_end {
  return expCreate.createFunctionCall ({
    "sourceName": sourceName,
    "actualparams": actualparams,
    "location": location()
  })
}

simpleExpression = number:numberliteral {
    return expCreate.createSimpleExpression
( {
    "value": !isNaN(parseInt(number, 10)) ? parseInt(number, 10) : 0, // the default for parseInt is not (!) the decimal system
    "location": location()
  })
}



// This is a partial grammar file for re-use in other grammars

// the following is basic stuff

curly_begin    = ws "{" ws
curly_end      = ws "}" ws
round_begin    = ws "(" ws
round_end      = ws ")" ws
comma_separator = ws "," ws
semicolon_separator = ws ";" ws
// TODO rename the following to colon_separator
name_separator  = ws ":" ws
equals_separator  = ws "=" ws
plus_separator = ws "+" ws
ws "whitespace" = (([ \t\n\r]) / (SingleLineComment) / (MultiLineComment) )*
rws "required whitespace" = (([ \t\n\r]) / (SingleLineComment) / (MultiLineComment) )+

var "variable"
  = first:varLetter rest:identifierChar* { return first + rest.join(""); }

string           = chars:anyChar* { return chars.join(""); }

varLetter           = [a-zA-Z]
identifierChar      = [a-zA-Z0-9_$] // any char but not /.,!?@~%^&*-=+(){}"':;<>?[]\/
anyChar             = [*a-zA-Z0-9' /\-[\]+<>=#$_.,!?@~%^&*-=+(){}:;<>?]
number              = [0-9]

numberliteral     = nums:number+ { return nums.join(""); }

// from javascript example
SingleLineComment
  = "//" (!LineTerminator SourceCharacter)*

LineTerminator
  = [\n\r\u2028\u2029]

SourceCharacter
  = .

Comment "comment"
  = MultiLineComment
  / SingleLineComment

MultiLineComment
  = "/*" (!"*/" SourceCharacter)* "*/"

// from JSOM example
char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "\["
      / "\]"
      / "$"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape
  = "\\"

unescaped
  = [^\0-\x1F\x22\x5C]

// ----- Core ABNF Rules -----

// See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4234).
DIGIT  = [0-9]
HEXDIG = [0-9a-f]

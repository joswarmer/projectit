// This is a partial grammar file for re-use in other grammars

// the following is basic stuff

curly_begin    = ws "{" ws
curly_end      = ws "}" ws
round_begin    = ws "(" ws
round_end      = ws ")" ws
comma_separator = ws "," ws
semicolon_separator = ws ";" ws
name_separator  = ws ":" ws
equals_separator  = ws "=" ws
ws "whitespace" = (([ \t\n\r]) / (SingleLineComment) / (MultiLineComment) )*

var "var"
  = first:varLetter rest:identifierChar* ws { return first + rest.join(""); }

string           = chars:anyChar* { return chars.join(""); }

varLetter           = [a-zA-Z]
identifierChar      = [a-zA-Z0-9_$] // anychar but not /.,!?@~%^&*-=+(){}"':;<>?[]\/
anyChar             = [*a-zA-Z0-9'/\-[\]+<>=#$_.,!?@~%^&*-=+(){}:;<>?]

// van javascript example
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
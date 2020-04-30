import { LANGUAGE_GEN_FOLDER, Names } from "../../../utils";
import { PiBinaryExpressionConcept, PiConcept, PiLanguageUnit, PiPrimitiveProperty } from "../../../languagedef/metalanguage/PiLanguage";
import { sortClasses } from "../../../utils/ModelHelpers";
import {
    DefEditorConcept,
    DefEditorLanguage,
    DefEditorProjectionExpression,
    DefEditorProjectionIndent,
    DefEditorProjectionText,
    DefEditorSubProjection,
    Direction,
    ListJoinType,
    MetaEditorProjectionLine
} from "../../metalanguage";
import { langExpToTypeScript } from "../../../utils";

export class UnparserTemplate {
    constructor() {
    }

    generateUnparser(language: PiLanguageUnit, editDef: DefEditorLanguage, relativePath: string): string {
        const allLangConcepts : string = Names.allConcepts(language);   
        const generatedClassName : String = Names.unparser(language);
        // TODO change comment before class

        // Template starts here 
        return `
        import { ${allLangConcepts} } from "${relativePath}${LANGUAGE_GEN_FOLDER }";
        import { ${language.concepts.map(concept => `
                ${concept.name}`).join(", ")} } from "${relativePath}${LANGUAGE_GEN_FOLDER }";     
        // TODO change import to @project/core
        import { PiLogger } from "../../../../../core/src/util/PiLogging";
                
        const LOGGER = new PiLogger("${generatedClassName}");
        
        enum SeparatorType {
            NONE = "NONE",
            Terminator = "Terminator",
            Separator = "Separator"
        }

        export class ${generatedClassName}  {

            public unparse(modelelement: ${allLangConcepts}) : string {
                ${sortClasses(language.concepts).map(concept => `
                if(modelelement instanceof ${concept.name}) {
                    //console.log("found a ${concept.name}");
                    return this.unparse${concept.name}(modelelement);
                }`).join("")}
                return "";
            }

            ${editDef.conceptEditors.map(conceptDef => `${this.makeConceptMethod(conceptDef)}`).join("\n")}
                        
            private unparseList(list: ${allLangConcepts}[], sepText: string, sepType: SeparatorType, vertical: boolean) : string {
                let result: string = "";
                list.forEach(listElem => {
                    result = result.concat(this.unparse(listElem));
                    if (sepType === SeparatorType.Separator) {
                        if (list.indexOf(listElem) !== list.length-1) result = result.concat(sepText);
                    }
                    if (sepType === SeparatorType.Terminator) {
                        result = result.concat(sepText);
                    }
                    if (vertical) result = result.concat("\\n");
                });
                return result;
            }
        } `;
    }

    makeConceptMethod (conceptDef: DefEditorConcept ) : string {
        // console.log("creating unparse method for concept " + conceptDef.concept.name + ", editDef: " + (conceptDef.projection? conceptDef.projection.toString() : conceptDef.symbol));
        let myConcept: PiConcept = conceptDef.concept.referred;
        let name: string = myConcept.name;
        let lines: MetaEditorProjectionLine[] = conceptDef.projection?.lines;

        if (!!lines) {
            return `
                private unparse${name}(modelelement: ${name}) : string {
                    return "${lines.map(line => `${this.makeLine(line)}` ).join("\\n")}"
                }`
        } else {
            if (myConcept instanceof  PiBinaryExpressionConcept && !!(conceptDef.symbol)) {
                return `private unparse${name}(modelelement: ${name}) : string {
                    return this.unparse(modelelement.left) + "${conceptDef.symbol}" + this.unparse(modelelement.right);
                }`
            }
            if (myConcept instanceof PiConcept && myConcept.isAbstract) {
                return `private unparse${name}(modelelement: ${name}) : string {
                    return "'unparse' should be implemented by subclasses of ${myConcept.name}";
                }`
            }
            // for now an empty method, when the default editDef contains a projection
            // for every concept, this will no longer be used
            return `private unparse${name}(modelelement: ${name}) : string {
                    return "";
                }`
        }
    }

    private makeLine (line : MetaEditorProjectionLine) : string {
        // the result should be text or should end in a quote
        let result: string = "";
        for (var _i = 0; _i < line.indent; _i++) {
            result = result + " ";
        }
        for (let item of line.items) {
            if (item instanceof DefEditorProjectionText) {
                result = result + `${item.text}`;
            }
            if (item instanceof DefEditorSubProjection) {
                // TODO take optionality into account
                let myElem = item.expression.findRefOfLastAppliedFeature();
                if (myElem instanceof PiPrimitiveProperty) {
                    // the expression is of primitive type
                    if (myElem.isList) {
                        result = result + `\" + ${langExpToTypeScript(item.expression)}.map(listElem => {
                                    ${langExpToTypeScript(item.expression)}
                                }) + \"`;
                    } else {
                        result = result + `\" + ${langExpToTypeScript(item.expression)} + \"`;
                    }
                } else {
                    // the expression has a concept as type, thus we need to call its unparse method
                    let type = myElem.type.referred;
                    if (!!type) {
                        if (myElem.isList) {
                            let vertical = (item.listJoin.direction === Direction.Vertical);
                            let joinType: string = "";
                            if (item.listJoin.joinType === ListJoinType.Separator) {
                                joinType = "SeparatorType.Separator";
                            }
                            if (item.listJoin.joinType === ListJoinType.Terminator) {
                                joinType = "SeparatorType.Terminator";
                            }
                            result = result + `\" + this.unparseList(${langExpToTypeScript(item.expression)}, "${item.listJoin.joinText}", ${joinType}, ${vertical}) + \"`;
                        } else {
                            result = result + `\" + this.unparse(${langExpToTypeScript(item.expression)}) + \"`;
                        }
                    }
                }
            }
            if (item instanceof DefEditorProjectionExpression) {
                // TODO implement this
                // console.log(item)
            }
            if (item instanceof DefEditorProjectionIndent) {
                // TODO implement this
            }
        }
        return result;
    }
}


import { Names } from "../../../utils/Names";
import { PiLanguageUnit } from "../../metalanguage/PiLanguage";

export class PiReferenceTemplate {
    constructor() {
    }

    generatePiReference(language: PiLanguageUnit): string {
        return `
        import { MobxModelElementImpl } from "@projectit/core";
        import { computed, observable } from "mobx";
        import { PiNamedElement } from "@projectit/core";
        import { ${Names.environment(language)} } from "../environment/${Names.environment(language)}";
        
        /**
         * Implementation for a (named) reference in ProjectIt.
         * Reference can be set with either a referred object, or with a name.
         */
        export class PiElementReference< T extends PiNamedElement> extends MobxModelElementImpl {
            @observable
            private _PI_name: string = "";
            @observable
            private _PI_referred: T = null;
        
            // Need for the scoper to work
            private typeName: string;
        
            public constructor(referredElement: T, typeName: string) {
                super();
                this.referred = referredElement;
                this.typeName = typeName;
            }
        
            set name(value: string) {
                this._PI_name = value;
                this._PI_referred = ${Names.environment(language)}.getInstance().scoper.getFromVisibleElements(this.piContainer().container, this._PI_name, this.typeName) as T;
            }
        
            @computed
            get name(): string {
                if(!!this._PI_referred){
                    // this._PI_name = this._PI_referred.name;
                    return this.referred.name
                }else{
                    this._PI_referred = ${Names.environment(language)}.getInstance().scoper.getFromVisibleElements(this.piContainer().container, this._PI_name, this.typeName) as T;
                }
                console.log("_PI_name: " + this._PI_name);
                return this._PI_name;
            }
        
            // @computed
            get referred(): T {
                if (!!this._PI_referred) {
                    return this._PI_referred;
                } else {
                    this._PI_referred = ${Names.environment(language)}.getInstance().scoper.getFromVisibleElements(this.piContainer().container, this._PI_name, this.typeName) as T;
                }
                return this._PI_referred;
            }
        
            set referred(referredElement) {
                if (!!referredElement) {
                    this._PI_name = referredElement.name;
                } else {
                    this._PI_name = "";
                }
                this._PI_referred = referredElement;
            }
        
            public static createNamed< T extends PiNamedElement>(name: string, typeName: string): PiElementReference<T> {
                const result = new PiElementReference(null, typeName);
                result.name = name;
                result.typeName = typeName;
                return result;
            }
        
            public static create< T extends PiNamedElement>(name: string | T, typeName: string): PiElementReference<T> {
                const result = new PiElementReference(null, typeName);
                if( typeof name === "string" ) {
                    result.name = name;
                } else if( typeof name === "object" ){
                    result.referred = name;
                }
                result.typeName = typeName;
                return result;
            }
        }`;
    }
}

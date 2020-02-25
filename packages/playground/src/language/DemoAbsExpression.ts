// Generated by the ProjectIt Language Generator.
import { WithType } from "./WithType";
import { PiExpression } from "@projectit/core";
import { model, observablepart } from "@projectit/model";
import { LanguageConceptType } from "./Language";
import { DemoExpression } from "./DemoExpression";
import { DemoPlaceholderExpression } from "./DemoPlaceholderExpression";

@model
export class DemoAbsExpression extends DemoExpression implements PiExpression, WithType {
    readonly $type: LanguageConceptType = "DemoAbsExpression";

    constructor(id?: string) {
        super(id);
    }

    @observablepart expr: DemoExpression = new DemoPlaceholderExpression();

    get$Type(): LanguageConceptType {
        return this.$type;
    }

    piIsExpression(): boolean {
        return true;
    }

    piIsBinaryExpression(): boolean {
        return false;
    }

    piIsExpressionPlaceHolder(): boolean {
        return false;
    }
}

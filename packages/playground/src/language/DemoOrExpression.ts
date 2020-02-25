// Generated by the ProjectIt Language Generator.
import { WithType } from "./WithType";
import { PiBinaryExpression } from "@projectit/core";
import { model } from "@projectit/model";
import { LanguageConceptType } from "./Language";
import { DemoPlaceholderExpression } from "./DemoPlaceholderExpression";
import { DemoExpression } from "./DemoExpression";
import { DemoBinaryExpression } from "./DemoBinaryExpression";

@model
export class DemoOrExpression extends DemoBinaryExpression implements PiBinaryExpression, WithType {
    readonly $type: LanguageConceptType = "DemoOrExpression";

    constructor(id?: string) {
        super(id);

        this.left = new DemoPlaceholderExpression();
        this.right = new DemoPlaceholderExpression();
    }

    get$Type(): LanguageConceptType {
        return this.$type;
    }

    piIsExpression(): boolean {
        return true;
    }

    piIsBinaryExpression(): boolean {
        return true;
    }

    piIsExpressionPlaceHolder(): boolean {
        return false;
    }

    public piSymbol(): string {
        return "or";
    }

    piPriority(): number {
        return 1;
    }

    public piLeft(): DemoExpression {
        return this.left;
    }

    public piRight(): DemoExpression {
        return this.right;
    }

    public piSetLeft(value: DemoExpression): void {
        this.left = value;
    }

    public piSetRight(value: DemoExpression): void {
        this.right = value;
    }
}

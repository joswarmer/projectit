// Generated by the ProjectIt Language Generator.
import * as uuid from "uuid";
import { PiElement, PiNamedElement, PiExpression, PiBinaryExpression } from "@projectit/core";
import { model, observablepart } from "@projectit/core";
import { TaxRulesConceptType } from "./TaxRules";
import { Expression } from "./Expression";
import { IncomeType } from "./IncomeType";
import { TaxPayerType } from "./TaxPayerType";
import { PlaceholderExpression } from "./PlaceholderExpression";

@model
export abstract class BinaryExpression extends Expression implements PiBinaryExpression {
    readonly $typename: TaxRulesConceptType = "BinaryExpression";

    constructor(id?: string) {
        super(id);

        this.left = new PlaceholderExpression();
        this.right = new PlaceholderExpression();
    }

    @observablepart left: Expression = new PlaceholderExpression();

    @observablepart right: Expression = new PlaceholderExpression();

    piLanguageConcept(): TaxRulesConceptType {
        return this.$typename;
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
        return "unknown";
    }

    piPriority(): number {
        return -1;
    }

    public piLeft(): Expression {
        return this.left;
    }

    public piRight(): Expression {
        return this.right;
    }

    public piSetLeft(value: Expression): void {
        this.left = value;
    }

    public piSetRight(value: Expression): void {
        this.right = value;
    }
}
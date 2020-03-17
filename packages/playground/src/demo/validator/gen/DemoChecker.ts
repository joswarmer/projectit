// Generated by the ProjectIt Language Generator.
import { PiError, PiTyper } from "@projectit/core";
import {
    DemoModel,
    DemoEntity,
    DemoAttribute,
    DemoFunction,
    DemoVariable,
    DemoExpression,
    DemoPlaceholderExpression,
    DemoLiteralExpression,
    DemoStringLiteralExpression,
    DemoNumberLiteralExpression,
    DemoBooleanLiteralExpression,
    DemoAbsExpression,
    DemoBinaryExpression,
    DemoMultiplyExpression,
    DemoPlusExpression,
    DemoDivideExpression,
    DemoAndExpression,
    DemoOrExpression,
    DemoComparisonExpression,
    DemoLessThenExpression,
    DemoGreaterThenExpression,
    DemoEqualsExpression,
    DemoFunctionCallExpression,
    DemoIfExpression,
    DemoVariableRef,
    DemoAttributeType,
    DemoType
} from "../../language";

export class DemoChecker {
    public checkDemoModel(modelelement: DemoModel, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
        // @notEmpty this.entities
        if (modelelement.entities.length == 0) {
            errorList.push(new PiError("List 'this.entities' may not be empty", modelelement.entities));
        }
        // @notEmpty this.functions
        if (modelelement.functions.length == 0) {
            errorList.push(new PiError("List 'this.functions' may not be empty", modelelement.functions));
        }
    }

    public checkDemoEntity(modelelement: DemoEntity, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
        // @notEmpty this.attributes
        if (modelelement.attributes.length == 0) {
            errorList.push(new PiError("List 'this.attributes' may not be empty", modelelement.attributes));
        }
        // @notEmpty this.functions
        if (modelelement.functions.length == 0) {
            errorList.push(new PiError("List 'this.functions' may not be empty", modelelement.functions));
        }
    }

    public checkDemoAttribute(modelelement: DemoAttribute, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoFunction(modelelement: DemoFunction, typer: PiTyper, errorList: PiError[]) {
        // @typecheck conformsTo( this.expression, DemoAttributeType:String )
        if (!typer.conformsTo(modelelement.expression, DemoAttributeType.String)) {
            errorList.push(
                new PiError("Type of 'this.expression' does not conform to type of 'DemoAttributeType:String'", modelelement.expression)
            );
        }
        // @notEmpty this.parameters
        if (modelelement.parameters.length == 0) {
            errorList.push(new PiError("List 'this.parameters' may not be empty", modelelement.parameters));
        }
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoVariable(modelelement: DemoVariable, typer: PiTyper, errorList: PiError[]) {
        // @validName name
        if (!this.isValidName(modelelement.name)) {
            errorList.push(new PiError("'" + modelelement.name + "' is not a valid identifier", name));
        }
    }

    public checkDemoAbsExpression(modelelement: DemoAbsExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.expr, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.expr, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.expr' should be DemoAttributeType:Integer", modelelement.expr));
        }
    }

    public checkDemoMultiplyExpression(modelelement: DemoMultiplyExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Integer", modelelement.left));
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.right' should be DemoAttributeType:Integer", modelelement.right));
        }
    }

    public checkDemoPlusExpression(modelelement: DemoPlusExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Integer", modelelement.left));
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.right' should be DemoAttributeType:Integer", modelelement.right));
        }
    }

    public checkDemoDivideExpression(modelelement: DemoDivideExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Integer", modelelement.left));
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Integer )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Integer)) {
            errorList.push(new PiError("Type of 'this.right' should be DemoAttributeType:Integer", modelelement.right));
        }
    }

    public checkDemoAndExpression(modelelement: DemoAndExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Boolean", modelelement.left));
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.right' should be DemoAttributeType:Boolean", modelelement.right));
        }
    }

    public checkDemoOrExpression(modelelement: DemoOrExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Boolean", modelelement.left));
        }
        // @typecheck equalsType( this.left, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.left, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.left' should be DemoAttributeType:Boolean", modelelement.left));
        }
        // @typecheck equalsType( this.right, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.right, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.right' should be DemoAttributeType:Boolean", modelelement.right));
        }
    }

    public checkDemoComparisonExpression(modelelement: DemoComparisonExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.left, this.right )
        if (!typer.equalsType(modelelement.left, modelelement.right)) {
            errorList.push(new PiError("Type of 'this.left' should be this.right", modelelement.left));
        }
    }

    public checkDemoIfExpression(modelelement: DemoIfExpression, typer: PiTyper, errorList: PiError[]) {
        // @typecheck equalsType( this.condition, DemoAttributeType:Boolean )
        if (!typer.equalsType(modelelement.condition, DemoAttributeType.Boolean)) {
            errorList.push(new PiError("Type of 'this.condition' should be DemoAttributeType:Boolean", modelelement.condition));
        }
        // @typecheck conformsTo( this.whenTrue, this.whenFalse )
        if (!typer.conformsTo(modelelement.whenTrue, modelelement.whenFalse)) {
            errorList.push(new PiError("Type of 'this.whenTrue' does not conform to type of 'this.whenFalse'", modelelement.whenTrue));
        }
    }

    public checkDemoExpression(modelelement: DemoExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoPlaceholderExpression(modelelement: DemoPlaceholderExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoLiteralExpression(modelelement: DemoLiteralExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoStringLiteralExpression(modelelement: DemoStringLiteralExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoNumberLiteralExpression(modelelement: DemoNumberLiteralExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoBooleanLiteralExpression(modelelement: DemoBooleanLiteralExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoBinaryExpression(modelelement: DemoBinaryExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoLessThenExpression(modelelement: DemoLessThenExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoGreaterThenExpression(modelelement: DemoGreaterThenExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoEqualsExpression(modelelement: DemoEqualsExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoFunctionCallExpression(modelelement: DemoFunctionCallExpression, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    public checkDemoVariableRef(modelelement: DemoVariableRef, typer: PiTyper, errorList: PiError[]) {
        return null;
    }

    private isValidName(name: string): boolean {
        if (name == null) return false;
        // cannot start with number
        if (/[0-9]/.test(name[0])) return false;
        // may contain letters, numbers, '$', and '_', but no other characters
        if (/[.|,|!|?|@|~|%|^|&|*|-|=|+|(|)|{|}|"|'|:|;|<|>|?]/.test(name)) return false;
        if (/\\/.test(name)) return false;
        if (/[/|[|]]/.test(name)) return false;
        // may not contain whitespaces
        if (/[\t|\n|\r| ]/.test(name)) return false;
        // may not be a Typescript keyword
        // TODO implement this
        return true;
    }
}

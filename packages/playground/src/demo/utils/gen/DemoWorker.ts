// Generated by the ProjectIt Language Generator.
import {
    DemoAbsExpression,
    DemoAndExpression,
    DemoAttribute,
    DemoAttributeType,
    DemoBinaryExpression,
    DemoBooleanLiteralExpression,
    DemoComparisonExpression,
    DemoDivideExpression,
    DemoEntity,
    DemoEqualsExpression,
    DemoExpression,
    DemoFunction,
    DemoFunctionCallExpression,
    DemoGreaterThenExpression,
    DemoIfExpression,
    DemoLessThenExpression,
    DemoLiteralExpression,
    DemoModel,
    DemoMultiplyExpression,
    DemoNumberLiteralExpression,
    DemoOrExpression,
    DemoPlaceholderExpression,
    DemoPlusExpression,
    DemoStringLiteralExpression,
    DemoType,
    DemoVariable,
    DemoVariableRef
} from "../../language";

export interface DemoWorker {
    execBeforeDemoModel(modelelement: DemoModel);
    execAfterDemoModel(modelelement: DemoModel);

    execBeforeDemoEntity(modelelement: DemoEntity);
    execAfterDemoEntity(modelelement: DemoEntity);

    execBeforeDemoAttribute(modelelement: DemoAttribute);
    execAfterDemoAttribute(modelelement: DemoAttribute);

    execBeforeDemoFunction(modelelement: DemoFunction);
    execAfterDemoFunction(modelelement: DemoFunction);

    execBeforeDemoVariable(modelelement: DemoVariable);
    execAfterDemoVariable(modelelement: DemoVariable);

    execBeforeDemoExpression(modelelement: DemoExpression);
    execAfterDemoExpression(modelelement: DemoExpression);

    execBeforeDemoPlaceholderExpression(modelelement: DemoPlaceholderExpression);
    execAfterDemoPlaceholderExpression(modelelement: DemoPlaceholderExpression);

    execBeforeDemoLiteralExpression(modelelement: DemoLiteralExpression);
    execAfterDemoLiteralExpression(modelelement: DemoLiteralExpression);

    execBeforeDemoStringLiteralExpression(modelelement: DemoStringLiteralExpression);
    execAfterDemoStringLiteralExpression(modelelement: DemoStringLiteralExpression);

    execBeforeDemoNumberLiteralExpression(modelelement: DemoNumberLiteralExpression);
    execAfterDemoNumberLiteralExpression(modelelement: DemoNumberLiteralExpression);

    execBeforeDemoBooleanLiteralExpression(modelelement: DemoBooleanLiteralExpression);
    execAfterDemoBooleanLiteralExpression(modelelement: DemoBooleanLiteralExpression);

    execBeforeDemoAbsExpression(modelelement: DemoAbsExpression);
    execAfterDemoAbsExpression(modelelement: DemoAbsExpression);

    execBeforeDemoBinaryExpression(modelelement: DemoBinaryExpression);
    execAfterDemoBinaryExpression(modelelement: DemoBinaryExpression);

    execBeforeDemoMultiplyExpression(modelelement: DemoMultiplyExpression);
    execAfterDemoMultiplyExpression(modelelement: DemoMultiplyExpression);

    execBeforeDemoPlusExpression(modelelement: DemoPlusExpression);
    execAfterDemoPlusExpression(modelelement: DemoPlusExpression);

    execBeforeDemoDivideExpression(modelelement: DemoDivideExpression);
    execAfterDemoDivideExpression(modelelement: DemoDivideExpression);

    execBeforeDemoAndExpression(modelelement: DemoAndExpression);
    execAfterDemoAndExpression(modelelement: DemoAndExpression);

    execBeforeDemoOrExpression(modelelement: DemoOrExpression);
    execAfterDemoOrExpression(modelelement: DemoOrExpression);

    execBeforeDemoComparisonExpression(modelelement: DemoComparisonExpression);
    execAfterDemoComparisonExpression(modelelement: DemoComparisonExpression);

    execBeforeDemoLessThenExpression(modelelement: DemoLessThenExpression);
    execAfterDemoLessThenExpression(modelelement: DemoLessThenExpression);

    execBeforeDemoGreaterThenExpression(modelelement: DemoGreaterThenExpression);
    execAfterDemoGreaterThenExpression(modelelement: DemoGreaterThenExpression);

    execBeforeDemoEqualsExpression(modelelement: DemoEqualsExpression);
    execAfterDemoEqualsExpression(modelelement: DemoEqualsExpression);

    execBeforeDemoFunctionCallExpression(modelelement: DemoFunctionCallExpression);
    execAfterDemoFunctionCallExpression(modelelement: DemoFunctionCallExpression);

    execBeforeDemoIfExpression(modelelement: DemoIfExpression);
    execAfterDemoIfExpression(modelelement: DemoIfExpression);

    execBeforeDemoVariableRef(modelelement: DemoVariableRef);
    execAfterDemoVariableRef(modelelement: DemoVariableRef);

    execBeforeDemoAttributeType(modelelement: DemoAttributeType);
    execAfterDemoAttributeType(modelelement: DemoAttributeType);
}
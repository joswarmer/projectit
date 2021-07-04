import { PiCaret } from "./BehaviorUtils";
import { STYLES } from "../editor/components/styles/Styles";
import { AliasBox } from "../editor/boxes/AliasBox";
import { Box } from "../editor/boxes/Box";
import { HorizontalListBox, isHorizontalBox } from "../editor/boxes/ListBox";
import { SelectBox } from "../editor/boxes/SelectBox";
import { SelectOption } from "../editor/boxes/SelectOption";
import { IPiEditor } from "../editor/IPiEditor";
import { PiBinaryExpression, PiExpression } from "../language/PiModel";
import { PiProjection } from "../editor/PiProjection";
import {
    AFTER_BINARY_OPERATOR,
    BTREE,
    BEFORE_BINARY_OPERATOR,
    BINARY_EXPRESSION,
    EXPRESSION,
    EXPRESSION_SYMBOL,
    LEFT_MOST,
    RIGHT_MOST
} from "./BalanceTreeUtils";
import { NBSP, PiUtils } from "./PiUtils";

// const LOGGER = new PiLogger("PiExpressionHelpers");

export function createDefaultExpressionBox(exp: PiExpression, role: string, children: Box[], initializer?: Partial<HorizontalListBox>): Box {
    const leftMost = BTREE.isLeftMostChild(exp);
    const rightMost = BTREE.isRightMostChild(exp);
    if (leftMost || rightMost) {
        let result: HorizontalListBox;
        if (children.length === 1 && isHorizontalBox(children[0])) {
            result = children[0] as HorizontalListBox;
        } else {
            result = new HorizontalListBox(exp, EXPRESSION, children);
        }
        if (leftMost) {
            result.insertChild(new AliasBox(exp, LEFT_MOST, NBSP, { style: STYLES.aliasExpression }));
        }
        if (rightMost) {
            result.addChild(new AliasBox(exp, RIGHT_MOST, NBSP, { style: STYLES.aliasExpression }));
        }
        return result;
    } else {
        if (children.length === 1) {
            return children[0];
        } else {
            return new HorizontalListBox(exp, EXPRESSION, children);
        }
    }
}

export function createDefaultBinaryBox(projection: PiProjection, exp: PiBinaryExpression, symbol: string, editor: IPiEditor, style?: string): HorizontalListBox {
    const result = new HorizontalListBox(exp, BINARY_EXPRESSION);
    const projectionToUse = !!projection.rootProjection ? projection.rootProjection : projection;

    result.addChildren([
        (!!exp.piLeft() ? projectionToUse.getBox(exp.piLeft()) : new AliasBox(exp, "PiBinaryExpression-left", "[add-left]", { propertyName: "left" })),
        new AliasBox(exp, BEFORE_BINARY_OPERATOR, NBSP, {
            style: STYLES.aliasExpression
        }),
        createOperatorBox(editor, exp, symbol),
        new AliasBox(exp, AFTER_BINARY_OPERATOR, NBSP, {
            style: STYLES.aliasExpression
        }),
        (!!exp.piRight() ? projectionToUse.getBox(exp.piRight()) : new AliasBox(exp, "PiBinaryExpression-right", "[add-right]", { propertyName: "right" }))
    ]);
    return result;
}

/**
 * The creates an operator box as a selection to enable editing of operators.
 * @param editor
 * @param exp
 * @param symbol
 * @param style
 */
export function createOperatorBox(editor: IPiEditor, exp: PiBinaryExpression, symbol: string, style?: string): Box {
    const operatorBox = new SelectBox(
        exp,
        EXPRESSION_SYMBOL,
        "<...>",
        () => {
            if (!!editor.actions && editor.actions.binaryExpressionCreators) {
                return editor.actions.binaryExpressionCreators
                    .filter(e => !e.isApplicable || e.isApplicable(operatorBox))
                    .map(e => ({
                        id: e.trigger as string,
                        label: e.trigger as string,
                        description: "empty description for operator",
                        icon: null,
                        hideInList: false
                    }));
            } else {
                return [];
            }
        },
        () => null,
        async (option: SelectOption) => {
            if (editor.actions && editor.actions.binaryExpressionCreators) {
                const alias = editor.actions.binaryExpressionCreators.filter(e => (e.trigger as string) === option.id)[0];
                if (alias) {
                    const newExp = alias.expressionBuilder(operatorBox, alias.trigger, editor);
                    newExp.piSetLeft(exp.piLeft());
                    newExp.piSetRight(exp.piRight());
                    PiUtils.replaceExpression(exp, newExp, editor);
                    BTREE.balanceTree(newExp, editor);
                    exp = newExp;
                    await editor.selectElement(newExp.piRight());
                    await editor.selectBox(operatorBox.nextLeafRight.firstLeaf, PiCaret.LEFT_MOST);
                }
            }
        },
        {
            style: style
        }
    );

    operatorBox.getSelectedOption = () => {
        return { id: symbol, label: symbol };
    };

    return operatorBox;
}

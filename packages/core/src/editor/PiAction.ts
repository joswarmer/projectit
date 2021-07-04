import { Box } from "./boxes/Box";
import { PiBinaryExpression, PiElement, PiExpression } from "../language/PiModel";
import { PiCaret } from "../util/BehaviorUtils";
import { PiKey } from "../util/Keys";
import { IPiEditor } from "./IPiEditor";

export type PiTriggerType = string | RegExp | PiKey;

export function triggerToString(t: PiTriggerType): string {
    if (isRegExp(t)) {
        return t.source;
    } else if (isProKey(t)) {
        return t.meta.toString() + t.keyCode;
    } else {
        return t;
    }
}

// tag::action-interface[]
export interface PiActions {
    expressionCreators: PiExpressionCreator[];

    binaryExpressionCreators: PiBinaryExpressionCreator[];

    customBehaviors: PiCustomBehavior[];

    keyboardActions: KeyboardShortcutBehavior[];
}
// end::action-interface[]

// tag::PiBehavior[]
export interface PiBehavior {
    /**
     * The trigger to activate this behavior
     */
    trigger: PiTriggerType;

    /**
     * The box roles in which this trigger is active
     */
    activeInBoxRoles: string[];

    /**
     * Optional callback function that returns whether the trigger is applicable for the specific box.
     */
    isApplicable?: (box: Box) => boolean;
    boxRoleToSelect?: string;
    caretPosition?: PiCaret;
}
// end::PiBehavior[]

/**
 * Special behavior for creating an expression.
 */
export interface PiExpressionCreator extends PiBehavior {
    expressionBuilder: (box: Box, trigger: PiTriggerType, editor: IPiEditor, propertyName?: string) => PiExpression;
}

/**
 * Special behavior for creating a binary expression.
 */
export interface PiBinaryExpressionCreator extends PiBehavior {
    expressionBuilder: (box: Box, trigger: PiTriggerType, editor: IPiEditor, propertyName?: string) => PiBinaryExpression;
}

/**
 * Behavior with custom action, intended to be used to create non expression elements.
 */
export interface PiCustomBehavior extends PiBehavior {
    action: (box: Box, trigger: PiTriggerType, editor: IPiEditor, propertyName?: string) => PiElement | null;
}

// TODO Use this to replace KeyboardShortcutTrigger
export interface KeyboardShortcutBehavior extends PiBehavior {
    trigger: PiKey;
    action: (box: Box, trigger: PiKey, editor: IPiEditor, propertyName?: string) => Promise<PiElement>;
}

export function isRegExp(a: PiTriggerType): a is RegExp {
    return (a as any).exec !== undefined;
}

export function isProKey(a: PiTriggerType): a is PiKey {
    return (a as any).meta !== undefined;
}

export function isString(a: PiTriggerType): a is string {
    return !isRegExp(a) && typeof a === "string";
}

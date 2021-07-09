import { BehaviorExecutionResult, executeBehavior } from "../../util/BehaviorUtils";
import { MatchUtil } from "../../util/MatchUtil";
import { triggerToString } from "../PiAction";
import { PiEditor } from "../PiEditor";
import { Box } from "./Box";
import { AbstractChoiceBox } from "./AbstractChoiceBox";
import { PiElement } from "../../language/PiModel";
import { SelectOption } from "./SelectOption";

export class AliasBox extends AbstractChoiceBox {
    readonly kind = "AliasBox";
    placeholder: string;
    /**
     * Filled with the name of the property, in case the AliasBox is used to create new elments
     */
    propertyName?: string;

    constructor(exp: PiElement, role: string, placeHolder: string, initializer?: Partial<AliasBox>) {
        super(exp, role, placeHolder, initializer);
    }

    getOptions(editor: PiEditor): SelectOption[] {
        const result = editor.behaviors
            .filter(a => a.activeInBoxRoles.includes(this.role) && MatchUtil.partialMatch(this.textBox.getText(), a.trigger))
            .map(a => {
                return {
                    id: triggerToString(a.trigger),
                    label: triggerToString(a.trigger),
                    description: "alias " + triggerToString(a.trigger)
                };
            });
        return result;
    }

    async selectOption(editor: PiEditor, option: SelectOption): Promise<BehaviorExecutionResult> {
        return await executeBehavior(this, option.id, editor);

    }
}

export function isAliasBox(b: Box): b is AliasBox {
    return b.kind === "AliasBox"; //  b instanceof AliasBox;
}

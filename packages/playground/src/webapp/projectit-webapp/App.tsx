import * as React from "react";
import { Dialog, DialogType, DialogFooter, Link } from "@fluentui/react";
import { PrimaryButton, DefaultButton } from "@fluentui/react";
import { ContextualMenu } from "@fluentui/react";
import { Text, Flex, Box } from "@fluentui/react-northstar";
import { MainGrid } from "./MainGrid";

// This component holds the MainGrid and the Dialog
// TODO states should be implemented differently: using mobx

export interface IDialogState {
    hideDialog: boolean;
    title: string;
    subText: string;
    content: JSX.Element;
}

export class App extends React.Component<{}, IDialogState> {
    useDefaultButton: boolean = false;
    // TODO use mobx state
    state: IDialogState = {
        hideDialog: true,
        title: "ProjectIt Dialog",
        subText: "This is the subtext.",
        content: null
    };

    private _dragOptions = {
        moveMenuItemText: "Move",
        closeMenuItemText: "Close",
        menu: ContextualMenu
    };

    constructor(props: {}) {
        super(props);
        App.thisApp = this;
        this.state.content = this.setInitialDialogContent();
    }

    public render() {
        const { hideDialog, title, subText, content } = this.state;
        return (
            <div>
                <div
                    style={{
                        height: "100%",
                        margin: "0"
                    }}
                >
                    <div
                        style={{
                            minHeight: "100%",
                            minWidth: "100%"
                        }}
                    >
                        <div
                            style={{
                                padding: "20px",
                                paddingBottom: "50px"
                            }}
                        >
                            <MainGrid />
                        </div>
                    </div>
                    <div
                        style={{
                            height: "50px",
                            marginTop: "-50px",
                            backgroundColor: "darkblue",
                            color: "rgba(211, 227, 253, 255)"
                        }}
                    >
                        {/*"footer"*/}
                        <Flex gap="gap.small" padding="padding.medium" hAlign="center">
                            <Text content="Created by ProjectIt " size="medium" />
                            <Link href="http://www.projectit.org/" target="_blank">
                                <Text content="(www.projectit.org)." />
                            </Link>
                        </Flex>
                        {/*Global dialog needs to be on the main page*/}
                        <Dialog
                            hidden={hideDialog}
                            onDismiss={this._dismissDialog}
                            dialogContentProps={{
                                type: DialogType.largeHeader,
                                title: title,
                                closeButtonAriaLabel: "Close",
                                subText: subText
                            }}
                            modalProps={{
                                // titleAriaId: this._labelId,
                                // subtitleAriaId: this._subTextId,
                                isBlocking: false,
                                styles: { main: { maxWidth: 450 } },
                                dragOptions: this._dragOptions
                            }}
                        >
                            {content}
                            <DialogFooter>
                                <PrimaryButton onClick={this._okDialog} text="Ok" />
                                {this.useDefaultButton ? <DefaultButton onClick={this._cancelDialog} text="Cancel" /> : null}
                            </DialogFooter>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

    private _showDialog = (): void => {
        this.setState({ hideDialog: false });
    };

    private _dismissDialog = (): void => {
        this.setState({ hideDialog: true });
        this.useDefaultButton = false;
        App.callBack = null;
    };

    private _okDialog = (): void => {
        this.setState({ hideDialog: true });
        this.useDefaultButton = false;
        if (!!App.callBack) {
            console.log("Calling callBack");
            App.callBack();
            App.callBack = null;
        }
    };

    private _cancelDialog = (): void => {
        App.callBack = null;
        this.setState({ hideDialog: true });
        this.useDefaultButton = false;
    };

    private setInitialDialogContent = () => {
        return <Text content="There should be some text here" size="medium" />;
    };

    // set of statics to enable the calling of the dialog from elsewhere in the application
    static thisApp: App;
    // set when a save dialog is opened.
    static callBack: () => void;

    public static showDialogWithCallback(onSave: () => void) {
        this.callBack = onSave;
        !!App.thisApp ? App.thisApp._showDialog() : console.error("No App object found");
    }

    public static showDialog = (): void => {
        !!App.thisApp ? App.thisApp._showDialog() : console.error("No App object found");
    };

    public static closeDialog = (): void => {
        !!App.thisApp ? App.thisApp._okDialog() : console.error("No App object found");
    };

    public static useDefaultButton = (): void => {
        !!App.thisApp ? (App.thisApp.useDefaultButton = true) : console.error("No App object found");
    };

    public static setDialogTitle = (newTitle: string): void => {
        !!App.thisApp ? (App.thisApp.state.title = newTitle) : console.error("No App object found");
    };

    public static setDialogSubText = (newSubText: string): void => {
        !!App.thisApp ? (App.thisApp.state.subText = newSubText) : console.error("No App object found");
    };

    public static setDialogContent = (newContent: JSX.Element): void => {
        !!App.thisApp ? (App.thisApp.state.content = newContent) : console.error("No App object found");
    };
}

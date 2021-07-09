import { CommandLineParser, CommandLineFlagParameter } from "@rushstack/ts-command-line";
import { ProjectItGenerateLanguage } from "./ProjectItGenerateLanguage.js";
import { ProjectItGenerateAllAction } from "./ProjectItGenerateAllAction.js";
import { ProjectItGenerateEditor } from "./ProjectItGenerateEditor.js";
import { ProjectItGenerateScoper } from "./ProjectItGenerateScoper.js";
import { ProjectItGenerateValidator } from "./ProjectItGenerateValidator.js";
import { ProjectItGenerateTyper } from "./ProjectItGenerateTyper.js";
import { MetaLogger } from "../utils/MetaLogger.js";

const LOGGER = new MetaLogger("ProjectItParser"); // .mute();

// The main entry ppoint for the ProjectIt generator
export class ProjectItParser extends CommandLineParser {
    private languageGenerator: ProjectItGenerateLanguage;
    private allGenerator: ProjectItGenerateAllAction;
    private editorGenerator: ProjectItGenerateEditor;
    private scoperGenerator: ProjectItGenerateScoper;
    private validatorGenerator: ProjectItGenerateValidator;
    private typerGenerator: ProjectItGenerateTyper;
    private verboseArg: CommandLineFlagParameter;
    private watchArg: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: "projectit",
            toolDescription: "ProjectIt toolset for generating languages, scopers, editors, etc."
        });

        this.allGenerator = new ProjectItGenerateAllAction();
        this.languageGenerator = new ProjectItGenerateLanguage();
        this.editorGenerator = new ProjectItGenerateEditor();
        this.scoperGenerator = new ProjectItGenerateScoper();
        this.validatorGenerator = new ProjectItGenerateValidator();
        this.typerGenerator = new ProjectItGenerateTyper();
        this.addAction(this.allGenerator);
        this.addAction(this.languageGenerator);
        this.addAction(this.editorGenerator);
        this.addAction(this.scoperGenerator);
        this.addAction(this.validatorGenerator);
        this.addAction(this.typerGenerator);

    }

    protected onDefineParameters(): void {
        this.verboseArg = this.defineFlagParameter({
            parameterLongName: "--verbose",
            parameterShortName: "-v",
            description: "Show extra logging detail"
        });
        this.watchArg = this.defineFlagParameter({
            parameterLongName: "--watch",
            parameterShortName: "-w",
            description: "Start generator in watch mode (only in combination with 'all')"
        });
    }

    protected onExecute(): Promise<void> {
        if (!this.verboseArg.value) {
            MetaLogger.muteAllLogs();
        }
        if (this.verboseArg.value) {
            MetaLogger.unmuteAllLogs();
        }
        if (!!this.watchArg.value) {
            this.allGenerator.watch = true;
        }
        try {
            return super.onExecute();
        } catch (e) {
            LOGGER.error(this, e.message + "\n" + e.stack);
        }
        return null;
    }
}

// Run this as the main program.
const projectit: ProjectItParser = new ProjectItParser();
projectit.execute();

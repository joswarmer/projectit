// import { isNullOrUndefined } from "@projectit/core";
import * as fs from "fs";
import { MetaLogger } from "../../utils/MetaLogger";
import { PiLanguage } from "../../languagedef/metalanguage";
import {
    EDITOR_FOLDER,
    EDITOR_GEN_FOLDER,
    GenerationStatus,
    Helpers,
    isNullOrUndefined,
    Names,
    STYLES_FOLDER
} from "../../utils";
import { PiEditUnit } from "../metalanguage";
import { PiEditProjectionUtil } from "../metalanguage/PiEditProjectionUtil";
import { ActionsTemplate, EditorIndexTemplate, ProjectionTemplate, SelectionHelpers } from "./templates";
import { CustomActionsTemplate, CustomProjectionTemplate, DefaultActionsTemplate, StylesTemplate } from "./templates";

const LOGGER = new MetaLogger("EditorGenerator"); // .mute();

export class EditorGenerator {
    public outputfolder: string = ".";
    protected editorGenFolder: string;
    protected editorFolder: string;
    protected stylesFolder: string;
    language: PiLanguage;

    generate(editDef: PiEditUnit): void {
        const generationStatus = new GenerationStatus();
        this.editorFolder = this.outputfolder + "/" + EDITOR_FOLDER;
        this.stylesFolder = this.outputfolder + "/" + STYLES_FOLDER;
        this.editorGenFolder = this.outputfolder + "/" + EDITOR_GEN_FOLDER;
        const name = editDef ? editDef.name : "";
        LOGGER.log("Generating editor '" + name + "' in folder " + this.editorGenFolder + " for language " + this.language?.name);

        // TODO the following should already have been set by the edit checker, but it seems to be needed here
        editDef.language = this.language;

        if (isNullOrUndefined(editDef)) {
            editDef = this.createDefaultEditorDefinition();
        }

        // add default values if they are not present in the editor definition
        PiEditProjectionUtil.addDefaults(editDef);

        const defaultActions = new DefaultActionsTemplate();
        const customActions = new CustomActionsTemplate();
        const actions = new ActionsTemplate();
        const projection = new ProjectionTemplate();
        const customProjectiontemplate = new CustomProjectionTemplate();
        const enumProjection = new SelectionHelpers();
        const editorIndexTemplate = new EditorIndexTemplate();
        const stylesTemplate = new StylesTemplate();

        // Prepare folders
        Helpers.createDirIfNotExisting(this.editorFolder);  // will not be overwritten
        Helpers.createDirIfNotExisting(this.stylesFolder);  // will not be overwritten
        Helpers.createDirIfNotExisting(this.editorGenFolder);
        Helpers.deleteFilesInDir(this.editorGenFolder, generationStatus);

        // set relative path to get the imports right
        const relativePath = "../../";

        //  Generate it
        LOGGER.log(`Generating projection default: ${this.editorGenFolder}/${Names.projectionDefault(this.language)}.ts`);
        const projectionfileDefault = Helpers.pretty(projection.generateProjectionDefault(this.language, editDef, relativePath),
            "Projection Default", generationStatus);
        fs.writeFileSync(`${this.editorGenFolder}/${Names.projectionDefault(this.language)}.ts`, projectionfileDefault);

        LOGGER.log(`Generating enumeration projections: ${this.editorGenFolder}/${Names.selectionHelpers(this.language)}.ts`);
        const enumProjectionFile = Helpers.pretty(enumProjection.generateEnumProjection(this.language, editDef, relativePath),
            "Enumeration Projections", generationStatus);
        fs.writeFileSync(`${this.editorGenFolder}/${Names.selectionHelpers(this.language)}.ts`, enumProjectionFile);

        LOGGER.log(`Generating default actions: ${this.editorGenFolder}/${Names.defaultActions(this.language)}.ts`);
        const defaultActionsFile = Helpers.pretty(defaultActions.generate(this.language, editDef, relativePath), "DefaultActions", generationStatus);
        fs.writeFileSync(`${this.editorGenFolder}/${Names.defaultActions(this.language)}.ts`, defaultActionsFile);

        // the following do not need the relativePath for imports
        LOGGER.log(`Generating actions: ${this.editorGenFolder}/${Names.actions(this.language)}.ts`);
        const actionsFile = Helpers.pretty(actions.generate(this.language, editDef), "Actions", generationStatus);
        fs.writeFileSync(`${this.editorGenFolder}/${Names.actions(this.language)}.ts`, actionsFile);

        LOGGER.log(`Generating manual actions: ${this.editorFolder}${Names.customActions(this.language)}.ts`);
        const customActionsFile = Helpers.pretty(customActions.generate(this.language), "CustomActions", generationStatus);
        Helpers.generateManualFile(`${this.editorFolder}/${Names.customActions(this.language)}.ts`, customActionsFile, "CustomActions");

        LOGGER.log(`Generating custom projection: ${this.editorFolder}${Names.customProjection(this.language)}.ts`);
        const customProjectionFile = Helpers.pretty(customProjectiontemplate.generate(this.language), "Custom Projection", generationStatus);
        Helpers.generateManualFile(`${this.editorFolder}/${Names.customProjection(this.language)}.ts`, customProjectionFile, "Custom Projection");

        LOGGER.log(`Generating editor styles: ${this.stylesFolder}/styles.ts`);
        const editorStylesConst = Helpers.pretty(stylesTemplate.generateConst(), "Editor Styles constant", generationStatus);
        Helpers.generateManualFile(`${this.stylesFolder}/styles.ts`, editorStylesConst, "Editor Styles Constant");

        LOGGER.log(`Generating editor gen index: ${this.editorGenFolder}/index.ts`);
        const editorIndexGenFile = Helpers.pretty(editorIndexTemplate.generateGenIndex(this.language, editDef), "Editor Gen Index", generationStatus);
        fs.writeFileSync(`${this.editorGenFolder}/index.ts`, editorIndexGenFile);

        LOGGER.log(`Generating editor index: ${this.editorFolder}/index.ts`);
        const editorIndexFile = Helpers.pretty(editorIndexTemplate.generateIndex(this.language, editDef), "Editor Index", generationStatus);
        fs.writeFileSync(`${this.editorFolder}/index.ts`, editorIndexFile);

        if (generationStatus.numberOfErrors > 0) {
            LOGGER.error(this, `Generated editor '${name}' with ${generationStatus.numberOfErrors} errors.`);
        } else {
            LOGGER.info(this, `Succesfully generated editor ${name}`);
        }
    }

    public createDefaultEditorDefinition(): PiEditUnit {
        const editDef = new PiEditUnit();
        editDef.name = "default";
        editDef.languageName = this.language.name;
        return editDef;
    }
}

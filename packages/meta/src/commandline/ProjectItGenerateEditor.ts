import { EditorGenerator } from "../editordef/generator/EditorGenerator";
import { PiEditParser } from "../editordef/parser/PiEditParser";
import { ProjectItGeneratePartAction } from "./ProjectItGeneratePartAction";
import { MetaLogger } from "../utils/MetaLogger";
import { ReaderWriterGenerator } from "../editordef/generator/ReaderWriterGenerator";

const LOGGER = new MetaLogger("ProjectItGenerateEditor"); // .mute();

export class ProjectItGenerateEditor extends ProjectItGeneratePartAction {
    protected editorGenerator: EditorGenerator = new EditorGenerator();
    protected parserGenerator: ReaderWriterGenerator = new ReaderWriterGenerator();

    public constructor() {
        super({
            actionName: "edit-it",
            summary: "Generates the typeScript code for the projectional editor for your language",
            documentation: "Generates TypeScript code for the projectional editor of language defined in the .ast files."
        });
    }

    generate(): void {
        LOGGER.log("Starting ProjectIt editor generation ...");
        super.generate();

        this.editorGenerator.outputfolder = this.outputFolder;
        this.editorGenerator.language = this.language;
        this.parserGenerator.outputfolder = this.outputFolder;
        this.parserGenerator.language = this.language;

        const editor = new PiEditParser(this.language).parseMulti(this.editFiles);
        // This command is being used to generate, specifically and only, the editor,
        // and the reader/writer couple. Therefore we do not generate a default editor when
        // no editor definition is found.
        if (editor === null) {
            throw new Error("Editor definition could not be parsed, exiting.");
        }
        this.editorGenerator.generate(editor);
        this.parserGenerator.generate(editor);
    }
}

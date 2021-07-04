import { IPiEditor } from "../editor";
import { ProjectionalEditor } from "../editor/components";
import { PiValidator } from "../validator";
import { PiScoper } from "../scoper";
import { PiTyper } from "../typer";
import { PiStdlib } from "../stdlib";
import { PiWriter } from "../writer";
import { PiReader } from "../reader";
import { PiModel } from "../language";

// tag::environment-interface[]
export interface PiEnvironment {
    /**
     * Creates a new model, an implementation of the language defined in the .ast file
     * @param name
     */
    newModel(name: string): PiModel;

    scoper: PiScoper;
    typer: PiTyper;
    validator: PiValidator;
    editor: IPiEditor;
    stdlib: PiStdlib;
    writer: PiWriter;
    reader: PiReader;

    projectionalEditorComponent: ProjectionalEditor;
    languageName: string;
    unitNames: string[];
}
// end::environment-interface[]

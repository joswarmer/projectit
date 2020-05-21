import { LanguageParser } from "../../parser/LanguageParser";
import { PiLanguageUnit } from "../../metalanguage";
import { LanguageGenerator } from "../../generator/LanguageGenerator";

describe("Checking generator for language definition", () => {
    let testdir = "src/languagedef/__tests__/language-tests/correctDefFiles/internal-structure/";
    let outputdir = "src/languagedef/__tests__/language-tests/correctDefFiles/internal-structure/output";
    let dirWithCorrectOutput = "src/languagedef/__tests__/language-tests/correctDefFiles/internal-structure/correct-output";

    test("generation of all kinds of properties", () => {
        let parser = new LanguageParser();
        let generator = new LanguageGenerator();
        let parseFile = testdir + "test2.lang";
        let model : PiLanguageUnit;
        try {
            model = parser.parse(parseFile);
            generator.outputfolder = outputdir;
            generator.generate(model);
        } catch(e) {
            // this is a real error
            console.log("Error in test generate language: " + e.message);
        }
    });
});
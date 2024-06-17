import { createInterface } from "readline";
import { readFile } from "./utils/file-input";
import { isValidURL, downloadContent } from "./utils/http-input";
import { Logger } from "./interfaces/logger";
import { ConsoleLogger } from "./utils/console-logger";

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

class TextAnalysis {
    words: number;
    letters: number;
    spaces: number;
    commonWords: any = {};

    constructor(text?: string) {
        let words = text?.match(/\S+/g);
        this.words = words?.length || 0;
        this.letters = text?.match(/[a-zA-Z]/g)?.length || 0;
        this.spaces = text?.match(/[ ]/g)?.length || 0;
        
        words?.forEach(word => {
            this.commonWords[word] = (this.commonWords[word] || 0) + 1;
        })
        this.commonWords = Object.fromEntries(
            Object.entries(this.commonWords)
                .filter(([key, value]) => (value as number) > 10)
        )
    }
}

//Singleton
export class TextAnalyzer {
    private static instance: TextAnalyzer;
    private logger: Logger;
    public text: string = "";
    public analysis: TextAnalysis;

    private constructor(logger: Logger) {
        this.logger = logger;
        this.analysis = new TextAnalysis()
        TextAnalyzer.instance = this;
    }

    //Dependency Injection
    static getInstance(logger?: Logger) {
        if (!logger && !TextAnalyzer.instance) 
            throw Error("Injected logger must be defined if an instance is not available");
        return TextAnalyzer.instance || new TextAnalyzer(logger as Logger);
    }

    public async loadText(input: string) {
        try {
            this.text = isValidURL(input) ? await downloadContent(input) : await readFile(input);
            this.analysis = new TextAnalysis(this.text);
        } catch (error) {
            if (error instanceof Error)
                this.logger.error("Error reading file or URL: " + error.message);
        }
    }

    public clear() {
        this.text = "";
        this.analysis = new TextAnalysis();
    }

    public logAnalysis() {
        this.logger.info(this.analysis);
    }
}

readLine.question("Insert a PATH or an URL to the file: ", async (input) => {
    await TextAnalyzer.getInstance(new ConsoleLogger()).loadText(input);
    TextAnalyzer.getInstance().logAnalysis();
    readLine.close();
});

import assert from 'assert';
import { TextAnalyzer } from '../src/text-analysis'; // Import the function to test
import { MockLogger } from './mock-logger'

describe('TextAnalyzer Test', () => {
    const logger = new MockLogger();
    const textAnalyzer = TextAnalyzer.getInstance(logger);

    afterEach(() => {
        textAnalyzer.clear();
        logger.logs = [];
    })

    it('Test downloaded text analysis', async () => {
        await textAnalyzer.loadText("https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt");
        let expectedAnalysis = {
            words: 858,
            letters: 3506,
            spaces: 2260,
            commonWords: {
                A: 15,
                SIGN: 21,
                DIAERESIS: 12,
                ACUTE: 13,
                CAPITAL: 56,
                LETTER: 114,
                WITH: 55,
                GRAVE: 11,
                CIRCUMFLEX: 11,
                O: 14,
                SMALL: 58
            }
        }
        assert.equal(logger.hasLogged("error"), false)
        assert.deepEqual(textAnalyzer.analysis, expectedAnalysis);
    });

    it('Test local text analysis', async () => {
        await textAnalyzer.loadText("test/local-text.txt");
        let expectedAnalysis = {
            words: 411,
            letters: 2230,
            spaces: 406,
            commonWords: {}
        }
        assert.equal(logger.hasLogged("error"), false)
        assert.deepEqual(textAnalyzer.analysis, expectedAnalysis);
    });

    it('Test wrong path', async () => {
        await textAnalyzer.loadText("test/no-file.txt");
        let expectedAnalysis = {
            words: 0,
            letters: 0,
            spaces: 0,
            commonWords: {}
        }
        assert.equal(logger.hasLogged("error"), true)
        assert.equal(textAnalyzer.text, "");
        assert.deepEqual(textAnalyzer.analysis, expectedAnalysis);
    });

    it('Test wrong url', async () => {
        await textAnalyzer.loadText("http://b1c5b0d3-db1a-4f62-b3fc-aca27b9a10f7.it/what.txt");
        let expectedAnalysis = {
            words: 0,
            letters: 0,
            spaces: 0,
            commonWords: {}
        }
        assert.equal(logger.hasLogged("error"), true)
        assert.equal(textAnalyzer.text, "");
        assert.deepEqual(textAnalyzer.analysis, expectedAnalysis);
    });
});

import AccessibilityTests from './tests/accessibility';
import CssTests from './tests/css';
import HeadTests from './tests/head';
import HtmlTests from './tests/html';
import ImagesTests from './tests/images';
import JavascriptTests from './tests/javascript';
import PerformanceTests from './tests/performance';
import SeoTests from './tests/seo';
import WebFontsTests from './tests/webfonts';

export default class {
    constructor() {
        this.tests = [
            ...AccessibilityTests.map((test) => { test.category = "accessibility"; return test; }),
            ...CssTests.map((test) => { test.category = "css"; return test; }),
            ...HeadTests.map((test) => { test.category = "head"; return test; }),
            ...HtmlTests.map((test) => { test.category = "html"; return test; }),
            ...ImagesTests.map((test) => { test.category = "images"; return test; }),
            ...JavascriptTests.map((test) => { test.category = "javascript"; return test; }),
            ...PerformanceTests.map((test) => { test.category = "performance"; return test; }),
            ...SeoTests.map((test) => { test.category = "seo"; return test; }),
            ...WebFontsTests.map((test) => { test.category = "webfonts"; return test; })
        ];
    }
    init() {
        console.log("init Tester2");
        console.table(this.tests);
    }
    runTests() {
        console.log("run Tester2 yeah");
    }
    getAllTests() {
        return this.tests;
    }
    getAllAutomatedTests() {
        return this.tests.filter(function(test) { return typeof test.automatedTest === "function" });
    }
    getAllManualTests() {
        return this.tests.filter(function(test) { return typeof test.automatedTest !== "function" });
    }
}
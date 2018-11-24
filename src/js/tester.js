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
            ...AccessibilityTests,
            ...CssTests,
            ...HeadTests,
            ...HtmlTests,
            ...ImagesTests,
            ...JavascriptTests,
            ...PerformanceTests,
            ...SeoTests,
            ...WebFontsTests
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
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
    constructor(projectHandler) {
        this.projectHandler = projectHandler;
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

    }
    runTests() {
        console.log("run Tester2 yeah");
    }
    adjustWithOverwrites(tests) {
        return (tests ||[]).map((test) => {
            var overwrites = (this.projectHandler.activeProjectState.testOverwrites || []).find((testOverwrite) => { return testOverwrite.id === test.id; }) || {};            
            return {...test, ...overwrites};
        }).filter(test => { return (typeof test.isActive !== "undefined" ? test.isActive : true) });
    }
    getAllTests(withOverwrites) {
        return withOverwrites ? this.adjustWithOverwrites(this.tests) : this.tests;
    }
    getAllAutomatedTests(withOverwrites) {
        var tests = this.tests.filter(function(test) { return typeof test.automatedTest === "function" });
        return withOverwrites ? this.adjustWithOverwrites(tests) : tests;
    }
    getAllManualTests(withOverwrites) {
        var tests = this.tests.filter(function(test) { return typeof test.automatedTest !== "function" });
        return withOverwrites ? this.adjustWithOverwrites(tests) : tests;
    }
}
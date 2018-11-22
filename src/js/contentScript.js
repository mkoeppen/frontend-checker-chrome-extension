import Tester2 from './tester'

/**
 * BASE TEST
 */

function TestBase(name) {
    this.name = name;
}

/**
 * Tests
 */

function HtmlImgTest(name) {
    this.result = undefined;
    this.errorList = [];
}
HtmlImgTest.prototype.runTest = function() {
    var testModule = this,
        imgElements = document.querySelectorAll("img");

    imgElements.forEach(function(element){ 
        testModule.testHasSrcAttribute(element);
        testModule.testHasAltAttribute(element);
    });

    return this.errorList;
}
HtmlImgTest.prototype.testHasSrcAttribute = function(element) {
    var elementAttr = element.getAttribute("src");
    if(elementAttr === null || typeof elementAttr === "undefined") {
        this.errorList.push({
            test: "testHasSrcAttribute",
            element: element,
            msg: "Ein img-Tag benötigt immer ein src-Attribute"
        });
    }
}
HtmlImgTest.prototype.testHasAltAttribute = function(element) {
    var elementAttr = element.getAttribute("alt");
    if(elementAttr === null || typeof elementAttr === "undefined") {
        this.errorList.push({
            test: "testHasAltAttribute",
            element: element,
            msg: "Ein img-Tag benötigt immer ein alt-Attribute"
        });
    }
}

function HtmlImgA(name) { 
    this.result = undefined;
    this.errorList = [];
}  
HtmlImgA.prototype.runTest = function() {

    return this.errorList;
}


/**
 * Tester
 */

function Tester() {
    this.tests = [
        new HtmlImgTest("Test"),
        new HtmlImgA("A"),
    ];
}
Tester.prototype.init = function() {
    console.log("init Tester");
}
Tester.prototype.runTests = function() {
    console.log("run Tester");
    var allErros = [];
    for (var i=0; i<this.tests.length; i++) {
        var currentTest = this.tests[i];
        if(typeof currentTest.runTest === "function") {
            allErros = allErros.concat(currentTest.runTest());
        }
    }
    console.table(allErros)
}

/**
 * Init Injection
 */

function init() {
    var currentTester = new Tester();
    currentTester.init();
    currentTester.runTests();
}
  
// Include guard: only execute once
// if (!window.injected) {
    window.injected = true;
    init();
// }

let tester2 = new Tester2();
tester2.init();
tester2.runTests();
'use strict';

import Tester from './tester'
import jsHelper from './jsHelper'

class Checkbox {
    constructor(name) {
        this.element = undefined;
        this.name = name;
    }
    generate() {
        this.element = document.createElement("label");
        this.element.classList = "label";

        this.element.innerHTML = `
                                <input  class="label__checkbox" type="checkbox" name=""/>
                                <span class="label__text">
                                    <span class="label__check">
                                        <i class="fa fa-check icon"></i>
                                    </span>
                                </span>`;

        return this.element;
    }
}

class Popup {
    constructor(popupElement) {
        this.tester = undefined;
        this.popup = popupElement;
        this.automatedTestsList = document.querySelector(".k-automated-tests")
        this.manuelTestsList = document.querySelector(".k-manuel-tests")
    }
    init() {
        
        this.initTester();
        this.initTabStrip();
        this.initAutomatedTests();          
        this.generateManuelTestList();          
        //currentTester.runTests();
    }
    initTester() {        
        this.tester = new Tester();
        this.tester.init();
    }
    initTabStrip() {

    }
    initAutomatedTests() {
        
    }
    generateManuelTestList() {
        var manuelTests = this.tester.getAllManuelTests();

        // clean list
        jsHelper.empty(this.manuelTestsList);

        manuelTests.forEach((test) => {
            var testContainer = document.createElement("li");
            testContainer.classList = "k-test";

            // state
            var stateContainer = document.createElement("div");
            stateContainer.classList = `k-test__state k-test__state--${test.priority.toLowerCase()}`;
            stateContainer.setAttribute("title", test.priority);
            testContainer.append(stateContainer);
            
            // checkbox
            var checkboxContainer = document.createElement("div");
            checkboxContainer.classList = "k-test__checkbox-container";
            checkboxContainer.append(new Checkbox(test.title).generate());
            testContainer.append(checkboxContainer);

            // title
            var titleContainer = document.createElement("div");
            titleContainer.classList = "k-test__title";
            titleContainer.innerHTML = `${test.title}`;
            testContainer.append(titleContainer);

            // description
            var descriptionContainer = document.createElement("div");
            descriptionContainer.classList = "k-test__description";
            descriptionContainer.innerHTML = `${test.description}`;
            testContainer.append(descriptionContainer);

            this.manuelTestsList.append(testContainer);
        })
    }
}

var popup;

window.onload = function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(null, {file: "contentScript.js"}, function() {
            // chrome.tabs.sendMessage(null, { action: "initTester", tester: tester });
            popup = new Popup(document);
            popup.init();
        });
    });
}
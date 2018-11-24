'use strict';

import Tester from './tester'
import Checkbox from './checkbox'
import jsHelper from './jsHelper'

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
            var checkboxContainer = document.createElement("label"),
            checkbox = new Checkbox(test.title);
            checkboxContainer.classList = "k-test__checkbox-container";
            checkboxContainer.append(checkbox.generate());
            testContainer.append(checkboxContainer);

            // title
            var titleContainer = document.createElement("label");
            titleContainer.setAttribute("for", checkbox.id);
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
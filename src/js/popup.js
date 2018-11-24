'use strict';

import Tester from './tester'
import TabStrip from './tabStrip'
import TestList from './testList'
import ProjectHandler from './projectHandler';
import ProjectView from './projectView';

class Popup {
    constructor(popupElement) {
        this.tester = undefined;
        this.popup = popupElement;
        this.tabStrip = undefined;
        this.automatedTestsList = document.querySelector(".k-automated-tests")
        this.manualTestsList = document.querySelector(".k-manual-tests")
        this.projectHandler = new ProjectHandler();
    }
    init() {        
        this.initTester();
        this.initTabStrip();
    }
    initTester() {        
        this.tester = new Tester();
        this.tester.init();
    }
    initTabStrip() { 
        this.tabStrip = new TabStrip(document.querySelector(".k-tab-strip"), {
            tabs: [
                {
                    title: "Manual",
                    classList: "k-manual-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.tester.getAllManualTests();
                        contentElement.append(new TestList(manualTests).generate());
                    }
                },
                {
                    title: "Automated",
                    classList: "k-automated-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.tester.getAllAutomatedTests();
                        contentElement.append(new TestList(manualTests).generate());                        
                    }
                },
                {
                    title: "All",
                    classList: "k-all-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.tester.getAllTests();
                        contentElement.append(new TestList(manualTests).generate());                        
                    }
                },
                {
                    title: "Projects",
                    classList: "k-projects",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        contentElement.append(new ProjectView(this.projectHandler).generate());
                    }
                }
            ]
        });
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
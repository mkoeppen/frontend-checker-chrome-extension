'use strict';

import TestHandler from './testHandler'
import TabStrip from './modules/tabStrip'
import TestListPage from './modules/testListPage'
import ProjectHandler from './projectHandler';
import ProjectPage from './modules/projectPage';

class Popup {
    constructor(popupElement) {
        this.testHandler = new TestHandler();
        this.popup = popupElement;
        this.tabStrip = undefined;
        this.automatedTestsList = document.querySelector(".k-automated-tests")
        this.manualTestsList = document.querySelector(".k-manual-tests")
        this.projectHandler = new ProjectHandler(this.testHandler);
    }
    init() {        
        this.inittestHandler();
        this.initTabStrip();
    }
    inittestHandler() {        
        this.testHandler.init();
    }
    initTabStrip() { 
        this.tabStrip = new TabStrip(document.querySelector(".k-tab-strip"), {
            tabs: [
                {
                    title: "Manual",
                    classList: "k-manual-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllManualTests();
                        contentElement.append(new TestListPage(manualTests).generate());
                    }
                },
                {
                    title: "Automated",
                    classList: "k-automated-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllAutomatedTests();
                        contentElement.append(new TestListPage(manualTests).generate());                        
                    }
                },
                {
                    title: "All",
                    classList: "k-all-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllTests();
                        contentElement.append(new TestListPage(manualTests).generate());                        
                    }
                },
                {
                    title: "Projects",
                    classList: "k-projects",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        contentElement.append(new ProjectPage(this.projectHandler, this.testHandler).generate());
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
            // chrome.tabs.sendMessage(null, { action: "inittestHandler", testHandler: testHandler });
            popup = new Popup(document);
            popup.init();
        });
    });
}
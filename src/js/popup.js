'use strict';

import TestHandler from './testHandler'
import TabStrip from './modules/tabStrip'
import TestListPage from './modules/testListPage'
import ProjectHandler from './projectHandler';
import ProjectPage from './modules/projectPage';
import jsHelper from './jsHelper';

class Popup {
    constructor(popupElement) {
        this.testHandler = undefined;
        this.popup = popupElement;
        this.tabStrip = undefined;
        this.automatedTestsList = document.querySelector(".k-automated-tests")
        this.manualTestsList = document.querySelector(".k-manual-tests")
        this.projectHandler = undefined;
    }
    init(activeTab) {   
        chrome.tabs.getSelected(null, (tab) => {
            var contentElement = document.querySelector(".k-tab-strip");
            jsHelper.empty(contentElement);

            this.projectHandler = new ProjectHandler(tab.url, this.testHandler);
            this.projectHandler.init();
            this.projectHandler.loadProjectListAsync().then(() => {
                this.testHandler.init();
                jsHelper.empty(contentElement);
                if(typeof (this.projectHandler.activeProject || {}).id === "string") {
                    this.initTabStrip(activeTab);
                } else {
                    var projectList = new ProjectPage(this.projectHandler, this.testHandler);
                    contentElement.append(projectList.generate());
                    var infoText = document.createElement("div");
                    infoText.classList.add("k-info-text");
                    infoText.innerHTML = `<h1>No matching Project found</h1><p>Adjust existing rules or create a new project</p>`;
                    projectList.element.prepend(infoText);
                }
            });
            this.testHandler = new TestHandler(this.projectHandler);
        });
    }
    initTabStrip(activeTab) { 
        this.tabStrip = new TabStrip(document.querySelector(".k-tab-strip"), {
            activeTab: activeTab,
            tabs: [
                {
                    title: "Manual",
                    tabName: "manual",
                    classList: "k-manual-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllManualTests(true);
                        contentElement.append(new TestListPage(this.projectHandler, manualTests).generate());
                    }
                },
                {
                    title: "Automated",
                    tabName: "automated",
                    classList: "k-automated-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllAutomatedTests(true);
                        contentElement.append(new TestListPage(this.projectHandler, manualTests).generate());                        
                    }
                },
                {
                    title: "All",
                    tabName: "all",
                    classList: "k-all-tests",
                    initTabFunc: (contentElement, titleElement, tabStrip) => {
                        var manualTests = this.testHandler.getAllTests(true);
                        contentElement.append(new TestListPage(this.projectHandler, manualTests).generate());                        
                    }
                },
                {
                    title: "Projects",
                    tabName: "projects",
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
            popup = new Popup(document);
            popup.init();
            document.addEventListener('reinit-popup', (e) => {
                var activeTab = ((e || {}).detail || {}).activeTab;
                popup.init(activeTab);
            });
        });
    });
}
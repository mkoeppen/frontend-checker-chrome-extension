'use strict'

import jsHelper from '../jsHelper'
import ProjectDetailsMenu from './projectPage.projectDetailsMenu'
import ProjectTestList from './projectPage.projectTestList'
import ProjectSettings from './projectPage.projectSettings'

export default class ProjectDetails {
    constructor(projectHandler, testHandler) {
        this.element = undefined;
        this.detailsContent = undefined;
        this.project = undefined;
        this.state = undefined;
        this.projectHandler = projectHandler;
        this.testHandler = testHandler;
        this.menuItems = [
            {
                tabName: "project",
                tabLabel: "Project",
                tabIcon: "fa fa-list-alt",
                initFunc: (project) => {
                    return new ProjectSettings(project).generate();
                }
            },
            {
                tabName: "accessibility",
                tabLabel: "Accessibility",
                tabIcon: "fa fa-universal-access"
            },
            {
                tabName: "css",
                tabLabel: "CSS",
                tabIcon: "fa fa-css3"
            },
            {   
                tabName: "head",
                tabLabel: "HEAD",
                tabIcon: "fa fa-header"
            },
            { 
                tabName: "html",
                tabLabel: "HTML",
                tabIcon: "fa fa-html5"
            },
            {
                tabName: "images",
                tabLabel: "Images",
                tabIcon: "fa fa-picture-o"
            },
            {
                tabName: "javascript",
                tabLabel: "JavaScript",
                tabIcon: "fa fa-code"
            },
            {
                tabName: "performance",
                tabLabel: "Performance",
                tabIcon: "fa fa-area-chart"
            },
            {
                tabName: "seo",
                tabLabel: "SEO",
                tabIcon: "fa fa-line-chart"
            },
            {
                tabName: "webfonts",
                tabLabel: "Webfonts",
                tabIcon: "fa fa-font"
            }
        ];
        this.menu = undefined;
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList.add("k-project-details__wrapper");

        this.element.innerHTML = "ProjectDetails";

        return this.element;
    }
    initProject(project, state) {
        this.project = project || {};
        this.state = state || {};
        this.clear();

        // header
        this.header = document.createElement("div");
        this.header.classList.add("k-project-details__header");
        this.element.append(this.header);

        // stop editmode button
        var stopEditModeButton = document.createElement("button");
        stopEditModeButton.classList.add("k-project-details__stop-editmode-button");
        stopEditModeButton.innerHTML = '<i class="fa fa-arrow-circle-left" aria-hidden="true"></i>';
        stopEditModeButton.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('project-edit-cancel'));
        });
        this.header.append(stopEditModeButton);
        
        // headline
        var headline = document.createElement("h1");
        headline.classList.add("k-project-details__headline");
        headline.innerHTML = this.project.name;
        this.header.append(headline);

        // menu
        this.menu = new ProjectDetailsMenu(this.menuItems);
        this.element.append(this.menu.generate());

        // details content
        this.detailsContent = document.createElement("div");
        this.detailsContent.classList.add("k-project-details__content");
        this.element.append(this.detailsContent);

        document.addEventListener('project-details-menu-click', (e) => {
            this.onChangeContentPage(e.detail);
        });

        document.addEventListener('project-details-change-test-active', (e) => {
            this.onChangeTestActive(e.detail.testId, e.detail.isActive);
        });

        this.menu.setActive(this.menuItems[0]);
    }
    onChangeContentPage(menuItem) {
        jsHelper.empty(this.detailsContent);

        if(menuItem && typeof menuItem.initFunc === "function") {
            this.detailsContent.append(menuItem.initFunc(this.project, this.state));  
        } else if(menuItem) {            
            this.detailsContent.append(new ProjectTestList(this.project, this.state, menuItem.tabName, this.testHandler.tests.filter((test) => {
                return test.category === menuItem.tabName;
            })).generate());
        }
    }
    onChangeTestActive(testId, isActive) {
        this.projectHandler.loadProjectStateAsync(this.project.id).then((state) => {

            state = state || {};
            var disabledTests = state.disabledTests || [];

            var index = disabledTests.indexOf(testId);
            if (index > -1) {
                disabledTests = disabledTests.splice(index, 1);
            }

            if(!isActive) {
                disabledTests.push(testId);
            }

            state.disabledTests = disabledTests;

            this.projectHandler.saveProjectStateAsync(this.project.id, state);
        });
    }
    clear() {
        jsHelper.empty(this.element);
    }
}
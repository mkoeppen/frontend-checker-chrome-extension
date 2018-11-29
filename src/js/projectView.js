'use strict'

import jsHelper from './jsHelper'
import TestCategory from './testCategory';

export default class ProjectList {
    constructor(projectHandler, tester) {
        this.projectHandler = projectHandler;
        this.element = undefined;
        this.projectDetailsElement = undefined;
        this.projectDetailsList = undefined;
        this.currentProject = undefined;
        this.toolbar = undefined;
        this.tester = tester;
        this.tabs = [
            {
                tabName: "project",
                tabLabel: "Project",
                tabIcon: "fa fa-list-alt",
                initFunc: (project) => {
            
                    /**
                     * Form
                     */
                    var formElement = document.createElement("form");
                    formElement.classList.add("k-form");
                    formElement.classList.add("k-project-details-form");
                    formElement.innerHTML = `
                        <input name="id" type="hidden" value="${project.id || ""}">
                        <div class="k-form__row"><label for="name">Name:</label><input id="name" name="name" type="text" value="${project.name || ""}"></div>
                        <div class="k-form__row"><label for="blacklistUrls">Blacklist Urls:</label><textarea id="blacklistUrls" name="blacklistUrls">${project.blacklistUrls || ""}</textarea></div>
                        <div class="k-form__row"><label for="whitelistUrls">Whitelist Urls:</label><textarea id="whitelistUrls" name="whitelistUrls">${project.whitelistUrls || ""}</textarea></div>
                        <div class="k-form__row k-form__row--center">
                            <button class="k-button k-project-details__cancel-button" type="button">Cancel</button>
                            <button class="k-button" type="submit">Save</button>
                        </div>
                    `;
                    formElement.addEventListener("submit", (e) => {
                        e.preventDefault();
            
                        var currentForm = e.target;
                        var project = {
                            id: currentForm.querySelector("input[name='id']").value,
                            name: currentForm.querySelector("input[name='name']").value,
                            blacklistUrls: currentForm.querySelector("textarea[name='blacklistUrls']").value,
                            whitelistUrls: currentForm.querySelector("textarea[name='whitelistUrls']").value,
                        }
            
                        this.projectHandler.saveProjectAsync(project, {}).then(() => {
                            this.refreshProjectList();
                            jsHelper.empty(this.projectDetailsElement);                    
                            this.element.classList.remove("k-editmode");
                        });
            
                        return false;
                    });
                    formElement.querySelector(".k-project-details__cancel-button").addEventListener("click", (e) => {
                        jsHelper.empty(this.projectDetailsElement);                    
                        this.element.classList.remove("k-editmode");
                    })
                    this.projectDetailsElement.append(formElement);
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
        ]
    }
    initProjectDetailsMenu() {
        // tests
        var testsList = document.createElement("div");
        testsList.classList = "k-project-details__tab-strip";

        this.tabs.forEach((tab) => {
            const tabButton = document.createElement("button");
            tabButton.classList = `k-project-details__tab-button`;
            tabButton.innerHTML = `<i class="${tab.tabIcon}" aria-hidden="true"></i>`;
            tabButton.setAttribute("title", tab.tabLabel);
            tabButton.setAttribute("data-tab", tab.tabName);

            tabButton.addEventListener("click", (e) => {
                testsList.parentElement.querySelectorAll(".k-project-details__tab-button.is-active").forEach((element) => {
                    element.classList.remove("is-active");
                });

                var button = e.currentTarget,
                    tabName = button.getAttribute("data-tab"),
                    tabConfig = undefined;

                this.tabs.forEach((tab) => {
                    if(tabName === tab.tabName) {
                        tabConfig = tab;
                    }
                });

                if(tabConfig && typeof tabConfig.initFunc === "function") {
                    tabConfig.initFunc(this.currentProject);
                } else {
                    
                    this.projectDetailsElement.append(new TestCategory(tabName, this.tester.tests).generate());
                }

                // testsList.parentElement.querySelectorAll(".k-test-category-list__category-details.is-active").forEach((element) => {
                //     element.classList.remove("is-active");
                // });
    
                tabButton.classList.add("is-active");
                //categoryDetails.classList.add("is-active");
            });

            testsList.append(tabButton);
        });

        return testsList;
    }
    generateDetailsElement() {
        // DETAILS

        this.projectDetailsWrapper = document.createElement("div");
        this.projectDetailsWrapper.classList.add("k-project-details__wrapper");
        this.element.append(this.projectDetailsWrapper);

        // tabs
        this.projectDetailsWrapper.append(this.initProjectDetailsMenu());

        // init project details        
        this.projectDetailsElement = document.createElement("div");
        this.projectDetailsElement.classList.add("k-project-details");
        this.projectDetailsWrapper.append(this.projectDetailsElement);

        return this.projectDetailsWrapper;
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList.add("k-projects");
        
        this.element.append(this.generateDetailsElement());



        this.projectHandler.initNewProject((project) => {
            this.initProjectDetails(project, true);
        });        
                
        // init project list        
        this.projectDetailsList = document.createElement("ul");
        this.projectDetailsList.classList.add("k-project-list");
        this.element.append(this.projectDetailsList);        
                
        // init project list        
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("k-project-list__controls");
        this.element.append(this.toolbar);

        var newProjectButton = document.createElement("button");
        newProjectButton.classList.add("k-button");
        newProjectButton.innerHTML = "+";
        newProjectButton.addEventListener("click", () => {
            this.projectHandler.initNewProject((project) => {
                this.initProjectDetails(project);
            });      
        })
        this.toolbar.append(newProjectButton);
        

        this.refreshProjectList();

        return this.element;
    }
    initProjectDetails(project) {
        
        this.currentProject = project || {};

        jsHelper.empty(this.projectDetailsElement);
        this.element.classList.add("k-editmode");

        this.tabs[0].initFunc(this.currentProject);

        // /**
        //  * Tests
        //  */

        // var categoryListElement = document.createElement("div");
        // categoryListElement.classList.add("k-project-categories");

        // categoryListElement.append(new TestCategoryList(this.tester.tests).generate());

        // this.projectDetailsElement.append(categoryListElement);
    }
    refreshProjectList() {

        jsHelper.empty(this.projectDetailsList);

        this.projectHandler.loadProjectListAsync().then((projectList) => {
            projectList.forEach(project => {
                var projectElement = document.createElement("li");
                projectElement.classList.add("k-project");
                projectElement.setAttribute("data-project-id", project.id);
                projectElement.innerHTML = `
                <span class="k-project__name">${project.name}</span>
                <div class="k-project__controls">
                    <button class="k-button k-button--icon-only k-project__delete-button" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button class="k-button k-button--icon-only k-project__edit-button" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                </div>`;

                this.projectDetailsList.append(projectElement);

                projectElement
                    .querySelector(".k-project__delete-button")
                    .addEventListener("click", (e) => {
                        var project = e.target.closest(".k-project");
                        this.projectHandler.deleteProjectAsync(project.getAttribute("data-project-id")).then(() => {
                            this.refreshProjectList();
                        });
                    });

                projectElement
                    .querySelector(".k-project__edit-button")
                    .addEventListener("click", (e) => {
                        this.onClickEditmode(e);
                    });

                projectElement
                    .addEventListener("dblclick", (e) => {
                        this.onClickEditmode(e);
                    });
            });
        });
    }
    onClickEditmode(e) {
        var projectElement = e.target.closest(".k-project"),
            projectId = projectElement.getAttribute("data-project-id");

        var project = this.projectHandler.getProjectWithId(projectId);

        if(project) {
            this.initProjectDetails(project);
        }
    }
    
}

'use strict'

import jsHelper from './jsHelper'

export default class ProjectList {
    constructor(projectHandler) {
        this.projectHandler = projectHandler;
        this.element = undefined;
        this.projectDetailsElement = undefined;
        this.projectDetailsList = undefined;
        this.toolbar = undefined;
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList.add("k-projects");

        // init project details        
        this.projectDetailsElement = document.createElement("div");
        this.projectDetailsElement.classList.add("k-project-details");
        this.element.append(this.projectDetailsElement);

        this.projectHandler.initNewProject((project) => {
            this.initProjectDetails(project, true);
        });        
                
        // init project list        
        this.projectDetailsList = document.createElement("ul");
        this.projectDetailsList.classList.add("k-project-list");
        this.element.append(this.projectDetailsList);        
                
        // init project list        
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("k-project-list");
        this.element.append(this.toolbar);

        var newProjectButton = document.createElement("button");
        newProjectButton.classList.add("k-button");
        newProjectButton.innerHTML = "+";
        newProjectButton.addEventListener("click", () => {
            this.projectHandler.initNewProject((project) => {
                this.initProjectDetails(project, true);
            });      
        })
        this.toolbar.append(newProjectButton);
        

        this.refreshProjectList();

        return this.element;
    }
    initProjectDetails(project, editmode) {
        project = project || {};

        jsHelper.empty(this.projectDetailsElement);

        if(editmode) {
            var formElement = document.createElement("form");
            formElement.classList.add("k-form");
            formElement.classList.add("k-project-details-form");
            formElement.innerHTML = `
                <input name="id" type="hidden" value="${project.id || ""}">
                <div class="k-form__row"><label for="name">Name:</label><input id="name" name="name" type="text" value="${project.name || ""}"></div>
                <div class="k-form__row"><label for="blacklistUrls">Blacklist Urls:</label><textarea id="blacklistUrls" name="blacklistUrls">${project.blacklistUrls || ""}</textarea></div>
                <div class="k-form__row"><label for="whitelistUrls">Whitelist Urls:</label><textarea id="whitelistUrls" name="whitelistUrls">${project.whitelistUrls || ""}</textarea></div>
                <div class="k-form__row k-form__row--center"><button class="k-button" type="submit">Save</button></div>
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
                });

                return false;
            })

            this.projectDetailsElement.append(formElement);
        } else {

        }
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
            });
        });
    }
    
}

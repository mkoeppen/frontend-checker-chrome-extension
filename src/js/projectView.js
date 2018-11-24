'use strict'

import jsHelper from './jsHelper'

export default class ProjectList {
    constructor(projectHandler) {
        this.projectHandler = projectHandler;
        this.element = undefined;
        this.projectDetailsElement = undefined;
        this.projectDetailsList = undefined;
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
        
        if(this.projectHandler.projectList.length === 0) {
            
        }

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

                console.log(project);

                return false;
            })

            this.projectDetailsElement.append(formElement);
        } else {

        }
    }
    
}

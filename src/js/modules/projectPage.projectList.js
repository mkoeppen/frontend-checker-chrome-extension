'use strict'

import jsHelper from '../jsHelper'

class ProjectListItem {
    constructor(project) {
        this.element = undefined;
        this.project = project;
    }
    generate() {
        this.element = document.createElement("li");
        this.element.classList.add("k-project");
        this.element.setAttribute("data-project-id", this.project.id);

        this.element.innerHTML = `
        <span class="k-project__name">${this.project.name}</span>
        <div class="k-project__controls">
            <button class="k-button k-button--icon-only k-project__delete-button" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button class="k-button k-button--icon-only k-project__edit-button" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>`;


        this.element.querySelector(".k-project__delete-button").addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('project-delete', { detail: this.project }));
        });

        this.element.querySelector(".k-project__edit-button").addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('project-edit', { detail: this.project }));
        });

        this.element.addEventListener("dblclick", () => {
            document.dispatchEvent(new CustomEvent('project-edit', { detail: this.project }));
        });

        return this.element;
    }
}

export default class ProjectList {
    constructor(projectHandler) {
        this.element = undefined;
        this.projectDetailsList = undefined;
        this.toolbar = undefined;
        this.projectHandler = projectHandler;
    }
    generate() {
        this.element = document.createElement("div");
        this.element.classList.add("k-projects__list");

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
            document.dispatchEvent(new CustomEvent('project-new'));
        })
        this.toolbar.append(newProjectButton);

        return this.element;
    }
    refresh() {
        jsHelper.empty(this.projectDetailsList);

        this.projectHandler.loadProjectListAsync().then((projectList) => {
            projectList.forEach(project => {
                this.projectDetailsList.append(new ProjectListItem(project).generate());
            });
        });
    }
}
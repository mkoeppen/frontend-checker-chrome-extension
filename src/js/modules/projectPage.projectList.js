'use strict'

import jsHelper from '../jsHelper'

class ProjectListItem {
    constructor(projectHandler, project) {
        this.projectHandler = projectHandler;
        this.element = undefined;
        this.project = project;
    }
    generate() {
        this.element = document.createElement("li");
        this.element.classList.add("k-project");
        if(this.project.hasMatchingRegex) {
            this.element.classList.add("k-project--matched");
        }
        if(this.projectHandler.activeProject.id === this.project.id) {
            this.element.classList.add("k-project--active");
        }
        this.element.setAttribute("data-project-id", this.project.id);

        this.element.innerHTML = `
        <span class="k-project__name">${this.project.name}</span>
        <div class="k-project__controls">
            <button class="k-button k-button--icon-only k-project__export-button" title="Export"><i class="fa fa-download" aria-hidden="true"></i></button>
            <button class="k-button k-button--icon-only k-project__delete-button" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <button class="k-button k-button--icon-only k-project__edit-button" title="Edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>`;


        this.element.querySelector(".k-project__export-button").addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('project-export', { detail: this.project }));
        });

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
        newProjectButton.innerHTML = "Create new Project";
        newProjectButton.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('project-new'));
        })
        this.toolbar.append(newProjectButton);

        var importProjectInput = document.createElement("input");
        importProjectInput.setAttribute('type', 'file');
        importProjectInput.addEventListener('change', (e) => {
            var that = this;
            var reader = new FileReader();
            reader.onload = function onReaderLoad(event){
                var importedData = JSON.parse(event.target.result);

                that.projectHandler.saveProjectAsync(importedData.project).then(() => {
                    that.projectHandler.saveProjectStateAsync(importedData.project.id, importedData.state).then(() => {
                        document.dispatchEvent(new CustomEvent('reinit-popup', { detail: { activeTab: "projects" } }))
                    });
                });
            };
            reader.readAsText(event.target.files[0]);
        });

        var importProjectButton = document.createElement("button");
        importProjectButton.classList.add("k-button");
        importProjectButton.setAttribute('title', 'Import Project');
        importProjectButton.innerHTML = "<i class='fa fa-upload'><i>";
        importProjectButton.addEventListener("click", () => {
            importProjectInput.click();
        });
        this.toolbar.append(importProjectButton);

        return this.element;
    }
    refresh() {
        jsHelper.empty(this.projectDetailsList);

        this.projectHandler.loadProjectListAsync().then((projectList) => {
            (projectList || []).forEach(project => {
                this.projectDetailsList.append(new ProjectListItem(this.projectHandler, project).generate());
            });
        });
    }
}
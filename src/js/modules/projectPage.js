'use strict'

import ProjectList from './projectPage.projectList';
import ProjectDetails from './projectPage.projectDetails';

export default class ProjectPage {
    constructor(projectHandler, testHandler) {
        this.element = undefined;
        this.projectList = undefined;
        this.projectDetails = undefined;
        this.projectHandler = projectHandler;
        this.testHandler = testHandler;
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList.add("k-projects");

        this.projectList = new ProjectList(this.projectHandler);
        this.element.append(this.projectList.generate());
        this.projectList.refresh()

        this.projectDetails = new ProjectDetails(this.projectHandler, this.testHandler);
        this.element.append(this.projectDetails.generate());

        document.addEventListener('project-export', (e) => {
            this.onExportProject(e.detail);
        }, false);

        document.addEventListener('project-delete', (e) => {
            this.onDeleteProject(e.detail);
        }, false);

        document.addEventListener('project-edit', (e) => {
            this.onEditProject(e.detail);
        }, false);

        document.addEventListener('project-new', (e) => {
            this.onNewProject();
        }, false);

        document.addEventListener('project-edit-cancel', (e) => {
            this.onEditCancelProject();
        }, false);

        document.addEventListener('project-save', (e) => {
            this.onSaveProject(e.detail);
        }, false);


        return this.element;
    } 
    onExportProject(project) {
        this.projectHandler.loadProjectStateAsync(project.id).then((state) => {

            const data = {
                project: project,
                state: state
            };
            delete data.project.hasMatchingRegex;
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)),
            downloadAnchorNode = document.createElement('a');

            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", project.name.toLowerCase().replace(/[^a-z]+/g, '_') + ".json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        });
    }    
    onDeleteProject(project) {
        this.projectHandler.deleteProjectAsync(project.id).then(() => {
            document.dispatchEvent(new CustomEvent('reinit-popup', { detail: { activeTab: "projects" } }));
        });
    }
    onEditProject(project, state, showTestTabs) {
        if(!state) {
            this.projectHandler.loadProjectStateAsync(project.id).then((state) => {
                this.element.classList.add("k-editmode");
                this.projectDetails.initProject(project, state, showTestTabs);
            });
        } else {            
            this.element.classList.add("k-editmode");
            this.projectDetails.initProject(project, state, showTestTabs);
        }
    }
    onNewProject() {
        this.projectHandler.initNewProject((newConfig) => {
            this.onEditProject(newConfig.project, newConfig.state, false);
        });
    }
    onEditCancelProject() {
        this.projectList.refresh()
        this.projectDetails.clear();                    
        this.element.classList.remove("k-editmode");
    }
    onSaveProject(project) {
        this.projectHandler.saveProjectAsync(project).then(() => {
            document.dispatchEvent(new CustomEvent('reinit-popup', { detail: { activeTab: "projects" } }))
        });
    }
    onSaveProjectState(projectId, state) {
        this.projectHandler.saveProjectStateAsync(projectId, state);
    }
}

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
    onDeleteProject(project) {
        this.projectHandler.deleteProjectAsync(project.id).then(() => {
            this.projectList.refresh()
        });
    }
    onEditProject(project, state) {
        if(!state) {
            this.projectHandler.loadProjectStateAsync(project.id).then((state) => {
                this.element.classList.add("k-editmode");
                this.projectDetails.initProject(project, state);
            });
        } else {            
            this.element.classList.add("k-editmode");
            this.projectDetails.initProject(project, state);
        }
    }
    onNewProject() {
        this.projectHandler.initNewProject((newConfig) => {
            this.onEditProject(newConfig.project, newConfig.state);
        });
    }
    onEditCancelProject() {
        this.projectList.refresh()
        this.projectDetails.clear();                    
        this.element.classList.remove("k-editmode");
    }
    onSaveProject(project) {
        this.projectHandler.saveProjectAsync(project).then(() => {
            this.onEditCancelProject();
        });
    }
    onSaveProjectState(projectId, state) {
        this.projectHandler.saveProjectStateAsync(projectId, state);
    }
}

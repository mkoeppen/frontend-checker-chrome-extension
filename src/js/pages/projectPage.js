'use strict'

import ProjectList from './projectPage.projectList';
import ProjectDetails from './projectPage.projectDetails';

export default class ProjectPage {
    constructor(projectHandler, tester) {
        this.element = undefined;
        this.projectList = undefined;
        this.projectDetails = undefined;
        this.projectHandler = projectHandler;
        this.tester = tester;
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList.add("k-projects");

        this.projectList = new ProjectList(this.projectHandler);
        this.element.append(this.projectList.generate());
        this.projectList.refresh()

        this.projectDetails = new ProjectDetails(this.projectHandler, this.tester);
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
    onEditProject(project) {
        this.element.classList.add("k-editmode");
        this.projectDetails.initProject(project);
    }
    onNewProject() {
        this.projectHandler.initNewProject((project) => {
            this.onEditProject(project);
        });
    }
    onEditCancelProject() {
        this.projectList.refresh()
        this.projectDetails.clear();                    
        this.element.classList.remove("k-editmode");
    }
    onSaveProject(project) {
        this.projectHandler.saveProjectAsync(project, {}).then(() => {
            this.onEditCancelProject();
        });
    }
}

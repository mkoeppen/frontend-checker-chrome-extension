'use strict'

import jsHelper from './jsHelper'

export default class ProjectHandler {
    constructor() {
        this.projectList = [];
        this.loadProjectList();
        this.activeProject = undefined;
    }
    loadProjectList() {
        chrome.storage.sync.get(['projectList'], (result) => {
            console.log('Value currently is ' + result.projectList);
            this.projectList = result.projectList || [];
        });
    }
    saveProjectList() {
        chrome.storage.local.set({projectList: this.projectList}, () => {
            console.log('Value is set to ' + this.projectList);
        });
    }
    saveProjectState(projectId, state) {
        var stateObject = {};
        stateObject[`project_state_${projectId}`] = state;
        chrome.storage.local.set(stateObject, () => {
            console.log('Value is set to ' + stateObject);
        });
    }
    initNewProject(callback) {
        chrome.tabs.getSelected(null, (tab) => {
            var guid = jsHelper.guid();
            var pathArray = tab.url.split( '/' );
            var protocol = pathArray[0];
            var host = pathArray[2];
            var whitelistUrl = protocol + '//' + host.replace("/", "\/").replace(".", "\.") + "/.*";

            callback({
                id: guid,
                name: host,
                blacklistUrls: "",
                whitelistUrls: whitelistUrl
            });
        });
    }
    saveProject(project, state) {
        this.loadProjectList();        
        this.projectList.push(project);
        this.saveProjectList();
        this.saveProjectState(project.guid, state);
    }
}

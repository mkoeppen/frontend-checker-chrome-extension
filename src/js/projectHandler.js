'use strict'

import jsHelper from './jsHelper'

export default class ProjectHandler {
    constructor() {
        this.projectList = [];
        this.activeProject = undefined;
        this.activeProjectState = undefined;
    }
    loadProjectListAsync() {
        var that = this;
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['projectList'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    that.projectList = result.projectList || [];
                    resolve(result.projectList);
                }
            });
        });
    }
    loadProjectStateAsync(projectId) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get([`project_state_${projectId}`], (result) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve(result[`project_state_${projectId}`] || {});
                }
            });
        });
    }
    saveProjectListAsync() {
        var that = this;
        return new Promise((resolve, reject) => {
            // order projects
            that.projectList = that.projectList.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })
            // save
            chrome.storage.local.set({projectList: that.projectList}, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve();
                }
            });
        });
    }
    saveProjectStateAsync(projectId, state) {

        state = state || {};              
        state.testOverwrites = (state.testOverwrites || []).filter((test) => {
            return typeof (test || {}).id === "string";
        });

        return new Promise((resolve, reject) => {
            var stateObject = {};
            stateObject[`project_state_${projectId}`] = state;
            chrome.storage.local.set(stateObject, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve();
                }
            });
        });
    }
    adjustProjectTestConfigAsync(projectId, testId, adjustStateFunc) {
        return new Promise((resolve, reject) => {
            this.loadProjectStateAsync(projectId).then((state) => {

                state = state || {};

                var testConfig = (state.testOverwrites || []).find((testOverwrite) => {
                    return testOverwrite.id === testId;
                }) || { 
                    id: testId
                };

                state.testOverwrites = (state.testOverwrites || []).filter((testOverwrite) => {
                    return testOverwrite.id !== testId;
                });

                state.testOverwrites.push(adjustStateFunc(testConfig));

                this.saveProjectStateAsync(projectId, state).then(() => {
                    resolve();
                });
            });
        });
    }
    deleteProjectStateAsync(projectId) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.remove(`project_state_${projectId}`, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    resolve();
                }
            });
        });
    }
    getProjectWithId(id) {
        var project = this.projectList.filter((p) => {
            return p.id === id;
        });

        return project.length > 0 ? project[0] : undefined
    }
    initNewProject(callback) {
        chrome.tabs.getSelected(null, (tab) => {
            var id = jsHelper.guid();
            var pathArray = tab.url.split( '/' );
            var protocol = pathArray[0];
            var host = pathArray[2];
            var whitelistUrl = protocol + '//' + host.replace("/", "\/").replace(".", "\.") + "/.*";

            callback({
                project: {
                    id: id,
                    name: host,
                    blacklistUrls: "",
                    whitelistUrls: whitelistUrl
                },
                state: {
                    testOverwrites: []
                }
            });
        });
    }
    saveProjectAsync(project) {
        return new Promise((resolve, reject) => {
            this.loadProjectListAsync().then(() => {
                this.projectList = this.projectList.filter((p) => {
                    return p.id !== project.id;
                });
                this.projectList.push(project);
                this.saveProjectListAsync().then(() => {
                    resolve();
                })
            });   
        });     
    }
    deleteProjectAsync(projectId) {
        return new Promise((resolve, reject) => {
            this.loadProjectListAsync().then(() => {
                this.projectList = this.projectList.filter((p) => {
                    return p.id !== projectId;
                });
                Promise.all([
                    this.saveProjectListAsync(), 
                    this.deleteProjectStateAsync(projectId)
                ]).then(() => {
                    resolve();
                })
            });   
        });     
    }
    checkMatchingProject(url, activateAfterMatch) {
        var activateAfterMatch = activateAfterMatch || false;

        return new Promise((resolve, reject) => {
            this.loadProjectListAsync().then(() => {
                var project = this.projectList.find((p) => {
                    var hasMatchingWhiteListRegex = false,
                        hasMatchingBlackListRegex = false;

                    (p.whitelistUrls || "").split("\n").forEach(regex => {
                        hasMatchingWhiteListRegex = hasMatchingWhiteListRegex || (typeof regex === "string" && regex.length > 0 && RegExp(regex).test(url));
                    });

                    (p.blacklistUrls || "").split("\n").forEach(regex => {
                        hasMatchingBlackListRegex = hasMatchingBlackListRegex || (typeof regex === "string" && regex.length > 0 && RegExp(regex).test(url));
                    });

                    return hasMatchingWhiteListRegex && !hasMatchingBlackListRegex;
                });

                if(activateAfterMatch) {
                    this.activeProject = project;
                    this.loadProjectStateAsync(project.id).then((state) => {
                        this.activeProjectState = state;
                        resolve(project);
                    });
                } else {
                    resolve(project);
                }
            });   
        });     
    }
}

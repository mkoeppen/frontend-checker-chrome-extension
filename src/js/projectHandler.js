'use strict'

import jsHelper from './jsHelper'

export default class ProjectHandler {
    constructor(url) {
        this.url = url;
        this.projectList = [];
        this.activeProject = undefined;
        this.activeProjectState = undefined;
    }
    init() {
        document.addEventListener('change-test-check-state', (e) => {
            this.onChangeTestCheckState(e.detail.testId, e.detail.checked);
        });
    }
    loadProjectListAsync() {
        var that = this;
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['projectList'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    that.projectList = (result.projectList || []).map((p) => {    
                        p.hasMatchingRegex = that.checkMatchingUrlRegex(p.whitelistUrls, p.blacklistUrls);
                        return p;
                    });
                  
                    var activeProject = that.projectList.find((p) => {
                        return p.hasMatchingRegex;
                    });
                    
                    if(activeProject) {
                        that.activeProject = activeProject;
                        that.loadProjectStateAsync(activeProject.id).then((state) => {
                            that.activeProjectState = state || {};
                            resolve(that.projectList);
                        });
                    } else {
                        that.activeProject = {};
                        that.activeProjectState = {};
                        resolve(that.projectList);
                    }
                    
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
        var id = jsHelper.guid();
        var pathArray = this.url.split( '/' );
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
    onChangeTestCheckState(testId, checked) {
        if(typeof this.activeProject.id === "string") {
            this.adjustProjectTestConfigAsync(this.activeProject.id, testId, state => {
                state.checked = checked;
                return state;
            });
        }
    }
    checkMatchingUrlRegex(whitelist, blacklist) {
        var hasMatchingWhiteListRegex = false,
            hasMatchingBlackListRegex = false;

        (whitelist || "").split("\n").forEach(regex => {
            hasMatchingWhiteListRegex = hasMatchingWhiteListRegex || (typeof regex === "string" && regex.length > 0 && RegExp(`^${regex}$`).test(this.url));
        });

        (blacklist || "").split("\n").forEach(regex => {
            hasMatchingBlackListRegex = hasMatchingBlackListRegex || (typeof regex === "string" && regex.length > 0 && RegExp(`^${regex}$`).test(this.url));
        });

        return hasMatchingWhiteListRegex && !hasMatchingBlackListRegex;
    }
}

'use strict'

import jsHelper from './jsHelper'

export default class ProjectHandler {
    constructor() {
        this.projectList = [];
        this.activeProject = undefined;
    }
    loadProjectListAsync() {
        var that = this;
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['projectList'], (result) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    console.log('Value currently is ' + result.projectList);
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
                    console.log('Value currently is ' + result[`project_state_${projectId}`]);
                    resolve(result[`project_state_${projectId}`] || {});
                }
            });
        });
    }
    saveProjectListAsync() {
        var that = this;
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({projectList: that.projectList}, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                } else {
                    console.log('Value is set to ' + that.projectList);
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
                    console.log('Value is set to ' + stateObject);
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
    checkMatchingProject(url) {
        return new Promise((resolve, reject) => {
            this.loadProjectListAsync().then(() => {
                var project = this.projectList.find((p) => {

                    var matchingWhitelistRegex = (p.whitelistUrls || "").split("\n").find((regex) => {
                        return RegExp(regex).test(url);
                    });

                    var matchingBlacklistRegex = (p.blacklistUrls || "").split("\n").find((regex) => {
                        return RegExp(regex).test(url);
                    });

                    console.log(matchingWhitelistRegex);
                    console.log(matchingBlacklistRegex);

                    return matchingWhitelistRegex && !matchingBlacklistRegex;
                });

                console.table(project);

                resolve(project);
            });   
        });     
    }
}

'use strict'

import jsHelper from '../jsHelper'

export default class TabStrip {
    constructor(element, options) {
        this.element = element;
        this.options = options;
        this.tabs = (this.options || {}).tabs || [];
        this.active = (this.options || {}).active || 0;
        this.titleList = undefined;

        this.init();
    }
    init() {        
        this.element.classList.add("k-tab-strip");

        jsHelper.empty(this.element);

        // init title list
        this.titleList = document.createElement("ul");
        this.titleList.classList.add("k-tab-strip__tabs");
        this.element.append(this.titleList);

        // init tabs
        this.tabs.forEach(tab => {
            this.addTab(tab);
            console.log(tab);
        });
        this.activateTab(this.active);
    }
    addTab(tab) {
        // init tab title
        var titleElement = document.createElement("li");
        titleElement.classList.add("k-tab-strip__tab");
        titleElement.classList.add(tab.classList);
        titleElement.innerText = tab.title;
        this.titleList.append(titleElement);
        titleElement.addEventListener("click", (e) => {
            var currentElement = e.target;
            this.activateTab(jsHelper.getIndex(currentElement));
        });

        // init tab content
        var contentElement = document.createElement("div");
        contentElement.classList.add("k-tab-strip__content");
        contentElement.classList.add(tab.classList);
        this.element.append(contentElement);

        tab.initTabFunc(contentElement, titleElement, this);
    }
    activateTab(activeId) {        
        // remove active title 
        this.titleList.childNodes.forEach((titleElement, index) => {
            if(index == activeId) {
                titleElement.classList.add("k-is-active");
            } else {
                titleElement.classList.remove("k-is-active");
            }
        })
        
        // remove active content 
        this.element.querySelectorAll(":scope > div").forEach((contentElement, index) => {                        
            if(index == activeId) {
                contentElement.classList.add("k-is-active");
            } else {
                contentElement.classList.remove("k-is-active");
            }
        })
    }

}

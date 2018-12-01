'use strict'

export default class ProjectDetailsMenu {
    constructor(tabs) {
        this.element = undefined;
        this.tabs = tabs
    }
    generate() {        
        this.element = document.createElement("div");
        this.element.classList = "k-project-details__menu";

        this.tabs.forEach((tab) => {
            const tabButton = document.createElement("button");
            tabButton.classList = `k-project-details__tab-button`;
            tabButton.innerHTML = `<i class="${tab.tabIcon}" aria-hidden="true"></i>`;
            tabButton.setAttribute("title", tab.tabLabel);
            tabButton.setAttribute("data-tab", tab.tabName);

            tabButton.addEventListener("click", (e) => {
                var button = e.currentTarget,
                    tabName = button.getAttribute("data-tab"),
                    tabConfig = undefined;

                this.tabs.forEach((tab) => {
                    if(tabName === tab.tabName) {
                        tabConfig = tab;
                    }
                });

                this.setActive(tabConfig);
            });

            this.element.append(tabButton);
        });

        return this.element;
    }
    setActive(menuItem) {
        
        this.element.querySelectorAll(".is-active").forEach((element) => {
            element.classList.remove("is-active");
        });
        this.element.querySelector(`.k-project-details__tab-button[data-tab='${menuItem.tabName}']`).classList.add("is-active");

        document.dispatchEvent(new CustomEvent('project-details-menu-click', { detail: menuItem }));
    }
}

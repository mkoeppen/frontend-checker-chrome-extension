'use strict'

export default class ProjectSettings {
    constructor(projectHandler, project) {
        this.element = undefined;
        this.project = project;
        this.projectHandler = projectHandler;
        this.whitelistInput = undefined;
        this.blacklistInput = undefined;
        this.matchingInfo = undefined;
    }
    generate() {        
        this.element = document.createElement("form");
        this.element.classList.add("k-form");
        this.element.classList.add("k-project-details__form");
        this.element.innerHTML = `
            <input name="id" type="hidden" value="${this.project.id || ""}">
            <div class="k-form__row"><label for="name">Name:</label><input id="name" name="name" type="text" value="${this.project.name || ""}"></div>
            <div class="k-form__row"><label for="whitelistUrls">Urls:</label><textarea id="whitelistUrls" name="whitelistUrls">${this.project.whitelistUrls || ""}</textarea></div>
            <div class="k-form__row"><label for="blacklistUrls">Blacklist Urls:</label><textarea id="blacklistUrls" name="blacklistUrls">${this.project.blacklistUrls || ""}</textarea></div>
            <div class="k-project-details__maching-info"></div>
            <div class="k-form__row k-form__row--center">
                <button class="k-button k-project-details__cancel-button" type="button">Cancel</button>
                <button class="k-button" type="submit">Save</button>
            </div>
        `;

        this.whitelistInput = this.element.querySelector('textarea[name="whitelistUrls"]');
        this.whitelistInput.addEventListener('keyup', () => { this.refreshMatchingInfo() });

        this.blacklistInput = this.element.querySelector('textarea[name="blacklistUrls"]');
        this.blacklistInput.addEventListener('keyup', () => { this.refreshMatchingInfo() });

        this.matchingInfo = this.element.querySelector('.k-project-details__maching-info');

        this.element.addEventListener("submit", (e) => {
            e.preventDefault();

            var currentForm = e.target;
            var project = {
                id: currentForm.querySelector("input[name='id']").value,
                name: currentForm.querySelector("input[name='name']").value,
                blacklistUrls: currentForm.querySelector("textarea[name='blacklistUrls']").value,
                whitelistUrls: currentForm.querySelector("textarea[name='whitelistUrls']").value,
            }

            document.dispatchEvent(new CustomEvent('project-save', {
                detail: project
            }));

            return false;
        });
        this.element.querySelector(".k-project-details__cancel-button").addEventListener("click", (e) => {
            document.dispatchEvent(new CustomEvent('project-edit-cancel'));
        })

        this.refreshMatchingInfo();

        return this.element;
    }
    refreshMatchingInfo() {
        var isMatching = this.projectHandler.checkMatchingUrlRegex(this.whitelistInput.value, this.blacklistInput.value);
        if(isMatching) {
            this.matchingInfo.innerHTML = `<i class="fa fa-check-circle-o" aria-hidden="true"></i>Current tab url is matching rules`;
            this.matchingInfo.classList.add('k-project-details__maching-info--is-matching');
        } else {
            this.matchingInfo.innerHTML = `<i class="fa fa-times-circle-o" aria-hidden="true"></i>Current tab url is not matching rules`
            this.matchingInfo.classList.remove('k-project-details__maching-info--is-matching');
        }
    }
}

'use strict'

export default class ProjectSettings {
    constructor(project) {
        this.element = undefined;
        this.project = project;
    }
    generate() {        
        this.element = document.createElement("form");
        this.element.classList.add("k-form");
        this.element.classList.add("k-project-details-form");
        this.element.innerHTML = `
            <input name="id" type="hidden" value="${this.project.id || ""}">
            <div class="k-form__row"><label for="name">Name:</label><input id="name" name="name" type="text" value="${this.project.name || ""}"></div>
            <div class="k-form__row"><label for="blacklistUrls">Blacklist Urls:</label><textarea id="blacklistUrls" name="blacklistUrls">${this.project.blacklistUrls || ""}</textarea></div>
            <div class="k-form__row"><label for="whitelistUrls">Whitelist Urls:</label><textarea id="whitelistUrls" name="whitelistUrls">${this.project.whitelistUrls || ""}</textarea></div>
            <div class="k-form__row k-form__row--center">
                <button class="k-button k-project-details__cancel-button" type="button">Cancel</button>
                <button class="k-button" type="submit">Save</button>
            </div>
        `;
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

        return this.element;
    }
}

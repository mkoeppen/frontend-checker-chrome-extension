'use strict'

import jsHelper from './jsHelper'

export default class Checkbox {
    constructor(name) {
        this.element = undefined;
        this.name = name;
        this.id = jsHelper.guid();
    }
    generate() {

        this.element = document.createElement("div");
        this.element.classList = "k-checkbox__wrapper";
        this.element.innerHTML = `<input type="checkbox" class="k-checkbox__input" id="${this.id}" /><label class="k-checkbox" for="${this.id}"></label>`;

        return this.element;
    }
}

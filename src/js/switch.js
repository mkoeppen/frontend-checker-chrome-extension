'use strict'

import jsHelper from './jsHelper'

export default class Switch {
    constructor(name) {
        this.element = undefined;
        this.name = name;
        this.id = jsHelper.guid();
    }
    generate() {

        this.element = document.createElement("div");
        this.element.classList = "k-switch__wrapper";
        this.element.innerHTML = `<input type="checkbox" class="k-switch__input" id="${this.id}" name="${this.name}">
                                    <label class="k-switch" for="${this.id}">
                                        <span class="k-switch__inner"></span>
                                        <span class="k-switch__switch"></span>
                                    </label>`;

        return this.element;
    }
}

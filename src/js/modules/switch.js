'use strict'

import jsHelper from '../jsHelper'

export default class Switch {
    constructor(name, checked, onChange) {
        this.element = undefined;
        this.name = name;
        this.checked = checked;
        this.id = jsHelper.guid();
        this.onChange = onChange;
    }
    generate() {

        this.element = document.createElement("div");
        this.element.classList = "k-switch__wrapper";
        this.element.innerHTML = `<input type="checkbox" class="k-switch__input" id="${this.id}" name="${this.name}">
                                    <label class="k-switch" for="${this.id}">
                                        <span class="k-switch__inner"></span>
                                        <span class="k-switch__switch"></span>
                                    </label>`;

        this.element.querySelector("input").addEventListener("change", (e) => {
            this.onChange(e.currentTarget.checked);
        });

        if(this.checked) {
            this.element.querySelector("input").setAttribute("checked", "checked");
        }

        return this.element;
    }
}

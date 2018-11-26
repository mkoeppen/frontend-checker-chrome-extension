'use strict'
import Checkbox from './checkbox'

class TestListItem {
    constructor(test) {
        this.test = test;
    }
    generate() {
        var testContainer = document.createElement("li");
        testContainer.classList = "k-test";

        // state
        var stateContainer = document.createElement("div");
        stateContainer.classList = `k-test__state k-test__state--${this.test.priority.toLowerCase()}`;
        stateContainer.setAttribute("title", this.test.priority);
        testContainer.append(stateContainer);
        
        // checkbox
        var checkboxContainer = document.createElement("label"),
        checkbox = new Checkbox(this.test.id);
        checkboxContainer.classList = "k-test__checkbox-container";
        checkboxContainer.append(checkbox.generate());
        testContainer.append(checkboxContainer);

        // title
        var titleContainer = document.createElement("label");
        titleContainer.setAttribute("for", checkbox.id);
        titleContainer.classList = "k-test__title";
        titleContainer.innerHTML = `${this.test.title}`;
        testContainer.append(titleContainer);

        // description
        var descriptionContainer = document.createElement("div");
        descriptionContainer.classList = "k-test__description";
        descriptionContainer.innerHTML = `${this.test.description}`;
        testContainer.append(descriptionContainer);

        return testContainer;
    }
}

export default class TestList {
    constructor(tests) {
        this.element = undefined;
        this.tests = tests;
    }
    generate() {        
        // init tab title
        this.element = document.createElement("ul");
        this.element.classList.add("k-test-list");

        this.tests.forEach((test) => {
            this.element.append(new TestListItem(test).generate());
        })

        return this.element;
    }
}

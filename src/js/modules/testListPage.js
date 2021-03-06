'use strict'
import Checkbox from './checkbox'
import jsHelper from '../jsHelper';

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
        checkbox = new Checkbox(this.test.id, this.test.checked, (state) => {
            document.dispatchEvent(new CustomEvent('change-test-check-state', { 
                detail: {
                    testId: this.test.id,
                    checked: state
                }
            }));
        });
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

class TestList {
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

class CheckedCounter {
    constructor(checkedCount, fullCount) {
        this.checkedCount = checkedCount || 0;
        this.fullCount = fullCount || 0;
        this.element = undefined;
    }
    generate() {
        this.element = document.createElement("span");
        this.element.classList.add("k-test-list__checked-counter");
        this.refreshElement();
        return this.element;
    }
    refreshElement() {
        jsHelper.empty(this.element);
        this.element.innerHTML = `<b>${this.checkedCount}</b><b>${this.fullCount}</b>`;
    }
    add(count) {
        this.checkedCount+=count;
        this.refreshElement();
    }
}

export default class TestListPage {
    constructor(projectHandler, tests) {
        this.element = undefined;
        this.projectHandler = projectHandler;
        this.tests = tests || [];
        this.checkedCounter = undefined;
    }
    generate() {        
        // init tab title
        this.element = document.createElement("div");
        this.element.classList.add("k-test-list__wrapper");

        var activeProjectHeadline = document.createElement("h2");
        activeProjectHeadline.innerHTML = this.projectHandler.activeProject.name;
        this.checkedCounter = new CheckedCounter(this.tests.filter(test => test.checked).length, this.tests.length);
        activeProjectHeadline.append(this.checkedCounter.generate());
        this.element.append(activeProjectHeadline);

        this.element.append(new TestList(this.tests).generate());

        document.addEventListener('change-test-check-state', (e) => {
            this.checkedCounter.add(e.detail.checked ? 1 : -1);
        })

        return this.element;
    }
}

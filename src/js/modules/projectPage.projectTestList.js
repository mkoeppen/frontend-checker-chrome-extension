'use strict'
import Switch from './switch'

class TestListItem {
    constructor(test) {
        this.test = test;
    }
    generate() {
        var testContainer = document.createElement("li");
        testContainer.classList = "k-test";
        
        // controls        
        var controlsContainer = document.createElement("div");
        controlsContainer.classList = "k-test__controls";
        testContainer.append(controlsContainer);
        
        // checkbox
        var switchCheckbox = new Switch(this.test.id, this.test.isActive, (state) => {
            document.dispatchEvent(new CustomEvent('project-details-change-test-active', { 
                detail: {
                    testId: this.test.id,
                    isActive: state
                }
            }));
        });
        var switchContainer = document.createElement("label");
        switchContainer.classList = "k-test__switch-container";
        switchContainer.append(switchCheckbox.generate());
        controlsContainer.append(switchContainer);

        // state
        var priorityContainer = document.createElement("select");
        priorityContainer.classList = `k-test__state-select k-test__state--${this.test.priority.toLowerCase()}`;
        priorityContainer.innerHTML = `
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        `;
        priorityContainer.querySelector(`[value=${this.test.priority}]`).setAttribute("selected", "selected");
        controlsContainer.append(priorityContainer);

        // title
        var titleContainer = document.createElement("label");
        titleContainer.setAttribute("for", switchCheckbox.id);
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

export default class ProjectTestList {
    constructor(project, state, categoryName, tests) {
        this.project = project;
        this.state = state;
        this.element = undefined;
        this.categoryName = categoryName;
        this.tests = tests;
    }
    generate() {
     
        this.element = document.createElement("div");
        this.element.classList.add("k-test-category-list__category-details");

        var categoryDetailsHeadline = document.createElement("h2");
        categoryDetailsHeadline.innerHTML = this.categoryName;

        this.element.append(categoryDetailsHeadline);

        // tests
        var testsList = document.createElement("ul");
        testsList.classList = "k-test-category-list__tests";
        this.element.append(testsList);

        this.tests.forEach((test) => {
            var overwrites = (this.state.testOverwrites || []).find((testOverwrite) => { return testOverwrite.id === test.id; }) || {};
            
            var mergedTestConfig = {...test, ...overwrites};
            
            testsList.append(new TestListItem(mergedTestConfig).generate());
        });

        return this.element;
    }
}

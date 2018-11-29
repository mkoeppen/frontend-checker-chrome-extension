'use strict'
import Switch from './switch'

class TestListItemForCategories {
    constructor(test) {
        this.test = test;
    }
    generate() {
        var testContainer = document.createElement("li");
        testContainer.classList = "k-test";
        
        // checkbox
        var switchContainer = document.createElement("label"),
        switchCheckbox = new Switch(this.test.id);
        switchContainer.classList = "k-test__checkbox-container";
        switchContainer.append(switchCheckbox.generate());
        testContainer.append(switchContainer);

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

        // state
        var priorityContainer = document.createElement("select");
        priorityContainer.classList = `k-test__state-select k-test__state--${this.test.priority.toLowerCase()}`;
        priorityContainer.innerHTML = `
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        `;
        priorityContainer.querySelector(`[value=${this.test.priority}]`).setAttribute("selected", "selected");
        testContainer.append(priorityContainer);

        return testContainer;
    }
}

export default class TestCategory {
    constructor(categoryName, tests) {
        this.categoryName = categoryName;
        this.tests = tests;
    }
    generate() {
        var testCategoryContainer = document.createElement("li");
        testCategoryContainer.classList = "k-test";
     
        var categoryDetails = document.createElement("div");
        categoryDetails.classList.add("k-test-category-list__category-details");
        testCategoryContainer.append(categoryDetails);

        var categoryDetailsHeadline = document.createElement("h2");
        categoryDetailsHeadline.innerHTML = this.categoryName;

        categoryDetails.append(categoryDetailsHeadline);

        // tests
        var testsList = document.createElement("ul");
        testsList.classList = "k-test-category-list__tests";
        categoryDetails.append(testsList);

        this.tests.forEach((test) => {
            testsList.append(new TestListItemForCategories(test).generate())
        });

        return testCategoryContainer;
    }
}

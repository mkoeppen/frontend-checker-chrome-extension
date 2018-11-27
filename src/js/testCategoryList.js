'use strict'
import Switch from './switch'

class TestListItemForCategories {
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

        return testContainer;
    }
}

class TestCategory {
    constructor(categoryName, tests) {
        this.categoryName = categoryName;
        this.tests = tests;
    }
    generate() {
        var testCategoryContainer = document.createElement("li");
        testCategoryContainer.classList = "k-test";

        // button
        var testCategoryButton = document.createElement("button");
        testCategoryButton.classList = `k-test-category-list__button`;
        testCategoryButton.setAttribute("title", this.categoryName);
        testCategoryContainer.append(testCategoryButton);
        
        // tests
        var testsList = document.createElement("ul");
        testsList.classList = "k-test-category-list__tests";
        testCategoryContainer.append(testsList);

        this.tests.forEach((test) => {
            testsList.append(new TestListItemForCategories(test).generate())
        });

        return testCategoryContainer;
    }
}

export default class TestCategoryList {
    constructor(tests) {
        this.element = undefined;
        this.tests = tests;
        this.categories = {}
    }
    generate() {        
        this.element = document.createElement("ul");
        this.element.classList.add("k-test-category-list");

        this.tests.forEach((test) => {
            if(!this.categories[test.category]) {
                this.categories[test.category] = [];
            }

            this.categories[test.category].push(test);
        });

        for (var categoryName in this.categories) {
            if (this.categories.hasOwnProperty(categoryName)) {
                this.element.append(new TestCategory(categoryName, this.categories[categoryName]).generate());
            }
        }

        return this.element;
    }
}

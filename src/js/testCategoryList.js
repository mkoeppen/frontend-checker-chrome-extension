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

class TestCategory {
    constructor(categoryName, tests, isActive) {
        this.categoryName = categoryName;
        this.tests = tests;
        this.isActive = isActive;
    }
    generate() {
        var testCategoryContainer = document.createElement("li");
        testCategoryContainer.classList = "k-test";

        // button
        var testCategoryButton = document.createElement("button");
        testCategoryButton.classList = `k-test-category-list__button`;

        var categoryFormatedName = "",
            categoryIconClass = "";

        switch(this.categoryName) {
            case "accessibility":
                categoryFormatedName = "Accessibility";
                categoryIconClass = "fa fa-universal-access";
            break;
            
            case "css":
                categoryFormatedName = "CSS";
                categoryIconClass = "fa fa-css3";
            break;
            
            case "head":
                categoryFormatedName = "HEAD";
                categoryIconClass = "fa fa-header";
            break;
            
            case "html":
                categoryFormatedName = "HTML";
                categoryIconClass = "fa fa-html5";
            break;
            
            case "images":
                categoryFormatedName = "Images";
                categoryIconClass = "fa fa-picture-o";
            break;
            
            case "javascript":
                categoryFormatedName = "JavaScript";
                categoryIconClass = "fa fa-code";
            break;
            
            case "performance":
                categoryFormatedName = "Performance";
                categoryIconClass = "fa fa-area-chart";
            break;
            
            case "seo":
                categoryFormatedName = "SEO";
                categoryIconClass = "fa fa-line-chart";
            break;
            
            case "webfonts":
                categoryFormatedName = "Webfonts";
                categoryIconClass = "fa fa-font";
            break;

        }

        testCategoryButton.innerHTML = `<i class="${categoryIconClass}" aria-hidden="true"></i>`;
        testCategoryButton.setAttribute("title", categoryFormatedName);
        testCategoryContainer.append(testCategoryButton);
        
        var categoryDetails = document.createElement("div");
        categoryDetails.classList.add("k-test-category-list__category-details");
        testCategoryContainer.append(categoryDetails);

        var categoryDetailsHeadline = document.createElement("h2");
        categoryDetailsHeadline.innerHTML = categoryFormatedName;

        categoryDetails.append(categoryDetailsHeadline);

        // tests
        var testsList = document.createElement("ul");
        testsList.classList = "k-test-category-list__tests";
        categoryDetails.append(testsList);

        testCategoryButton.addEventListener("click", () => {
            testCategoryContainer.parentElement.querySelectorAll(".k-test-category-list__button.is-active").forEach((element) => {
                element.classList.remove("is-active");
            });
            testCategoryContainer.parentElement.querySelectorAll(".k-test-category-list__category-details.is-active").forEach((element) => {
                element.classList.remove("is-active");
            });

            testCategoryButton.classList.add("is-active");
            categoryDetails.classList.add("is-active");
        })

        if(this.isActive) {
            testCategoryButton.classList.add("is-active");
            categoryDetails.classList.add("is-active");
        }

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
                var isActive = categoryName === "accessibility";
                this.element.append(new TestCategory(categoryName, this.categories[categoryName], isActive).generate());
            }
        }

        return this.element;
    }
}

export default class {
    constructor() {
        this.identifier = "test.images.alternative-text";
        this.title = "Alternative text";
        this.priority = "High";
        this.description = "All <img> have an alternative text which describe the image visually.";
        this.documentation = [
            {
                "title": "Alt-texts: The Ultimate Guide",
                "url": "https://axesslab.com/alt-texts/"
            }
        ],
        this.tags = ["all", "images"];
    }
    runAutomatedTest() {
        let imgElements = document.querySelectorAll("img"),
            elementsWithErrors = [];

        imgElements.forEach((element) => { 
            var altAttr = element.getAttribute("alt");
            if(altAttr === null || typeof altAttr === "undefined") {
                elementsWithErrors.push(element);
            }
        });

        return elementsWithErrors;
    }
}
export default [
  {
    "id": "html__html5-semantic-elements",
    "title": "HTML5 Semantic Elements",
    "priority": "High",
    "description": "HTML5 Semantic Elements are used appropriately (header, section, footer, main...).",
    "tools": [
      {
        "title": "HTML Reference",
        "url": "http://htmlreference.io/"
      }
    ],
    "tags": ["all", "html", "best practices"]
  },
  {
    "id": "html__error-pages",
    "title": "Error pages",
    "priority": "High",
    "description": "Error 404 page and 5xx exist",
    "detail": "Remember that the 5xx error pages need to have their CSS integrated (no external call on the current server).",
    "tags": ["all", "html", "best practices"]
  },
  {
    "id": "html__noopener",
    "title": "Noopener",
    "priority": "Medium",
    "description": "In case you are using external links with target=\"_blank\", your link should have a rel=\"noopener\" attribute to prevent tab nabbing. If you need to support older versions of Firefox, use rel=\"noopener noreferrer\"",
    "documentation": [
      {
        "title": "About rel=noopener",
        "url": "https://mathiasbynens.github.io/rel-noopener/"
      }
    ],
    "tags": ["all", "html", "best practices", "security"]
  },
  {
    "id": "html__clean-up-comments",
    "title": "Clean up comments",
    "priority": "Low",
    "description": "Unnecessary code needs to be removed before sending the page to production.",
    "tags": ["all", "html", "best practices"]
  },
  {
    "id": "html__w3c-compliant",
    "title": "W3C compliant",
    "priority": "High",
    "description": "All pages need to be tested with the W3C validator to identify possible issues in the HTML code.",
    "tools": [
      {
        "title": "W3C validator",
        "url": "https://validator.w3.org/"
      }
    ],
    "tags": ["all", "html", "testing"]
  },
  {
    "id": "html__html-lint",
    "title": "HTML Lint",
    "priority": "High",
    "description": "I use tools to help me analyze any issues I could have on my HTML code.",
    "tools": [
      {
        "title": "Dirty markup",
        "url": "https://dirtymarkup.com/"
      },
      {
        "title": "webhint",
        "url": "https://webhint.io/"
      }
    ],
    "tags": ["all", "html", "testing"]
  },
  {
    "id": "html__link-checker",
    "title": "Link checker",
    "priority": "High",
    "description": "There are no broken links in my page, verify that you don't have any 404 error.",
    "tools": [
      {
        "title": "W3C Link Checker",
        "url": "https://validator.w3.org/checklink"
      }
    ],
    "tags": ["all", "html", "testing"]
  },
  {
    "id": "html__adblockers-test",
    "title": "Adblockers test",
    "priority": "Medium",
    "description": "Your website shows your content correctly with adblockers enabled",
    "detail": "(You can provide a message encouraging people to disable their adblocker)",
    "tags": ["all", "html", "testing"]
  }
];

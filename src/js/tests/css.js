export default [
  {
    "id": "css__responsive-web-design",
    "title": "Responsive Web Design",
    "priority": "High",
    "description": "The website is using responsive web design.",
    "tags": ["all", "css"]
  },
  {
    "id": "css__print",
    "title": "CSS Print",
    "priority": "Medium",
    "description": "A print stylesheet is provided and is correct on each page.",
    "tags": ["all", "css"]
  },
  {
    "id": "css__unique-idD",
    "title": "Unique ID",
    "priority": "High",
    "description": "If IDs are used, they are unique to a page.",
    "tags": ["all", "css"]
  },
  {
    "id": "css__reset-css",
    "title": "Reset CSS",
    "priority": "High",
    "description": "A CSS reset (reset, normalize or reboot) is used and up to date.",
    "detail": "(If you are using a CSS Framework like Bootstrap or Foundation, a Normalize is already included into it.)",
    "documentation": [
      {
        "title": "Reset.css",
        "url": "https://meyerweb.com/eric/tools/css/reset/"
      },
      {
        "title": "Normalize.css",
        "url": "https://necolas.github.io/normalize.css/"
      },
      {
        "title": "Reboot",
        "url": "https://getbootstrap.com/docs/4.0/content/reboot/"
      }
    ],
    "tags": ["all", "css"]
  },
  {
    "id": "css__js-prefix",
    "title": "JS prefix",
    "priority": "Low",
    "description": "All classes (or id- used in JavaScript files) begin with js- and are not styled into the CSS files.",
    "code": "",
    "tags": ["all", "javascript", "best practices"]
  },
  {
    "id": "css__embedded-or-inline-css",
    "title": "Embedded or inline CSS",
    "priority": "High",
    "description": "Avoid at all cost embeding CSS in <style> tags or using inline CSS",
    "detail": "Only use for valid reasons (e.g. background-image for slider, critical CSS).",
    "tags": ["all", "css"]
  },
  {
    "id": "css__vendor-prefixes",
    "title": "Vendor prefixes",
    "priority": "High",
    "description": "CSS vendor prefixes are used and are generated accordingly with your browser support compatibility.",
    "tools": [
      {
        "title": "Autoprefixer CSS online",
        "url": "https://autoprefixer.github.io/"
      }
    ],
    "tags": ["all", "css"]
  },
  {
    "id": "css__concatenation",
    "title": "Concatenation",
    "priority": "High",
    "description": "CSS files are concatenated in a single file (Not for HTTP/2).",
    "tags": ["all", "css", "performance"]
  },
  {
    "id": "css__minification",
    "title": "Minification",
    "priority": "High",
    "description": "All CSS files are minified.",
    "tags": ["all", "css", "performance"]
  },
  {
    "id": "css__non-blocking",
    "title": "Non-blocking",
    "priority": "Medium",
    "description": "CSS files need to be non-blocking to prevent the DOM from taking time to load.",
    "documentation": [
      {
        "title": "loadCSS by filament group",
        "url": "https://github.com/filamentgroup/loadCSS"
      },
      {
        "title": "Example of preload CSS using loadCSS",
        "url": "https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf"
      }
    ],
    "tags": ["all", "css", "performance"]
  },
  {
    "id": "css__stylelint",
    "title": "Stylelint",
    "priority": "High",
    "description": "All CSS or SCSS files are without any errors.",
    "documentation": [
      {
        "title": "Sass guidelines",
        "url": "https://sass-guidelin.es/"
      }
    ],
    "tools": [
      {
        "title": "stylelint, a CSS linter",
        "url": "https://stylelint.io/"
      }
    ],
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__responsive-web-design",
    "title": "Responsive web design",
    "priority": "High",
    "description": "All pages were tested with the correct breakpoints.",
    "detail": "Example of breakpoints: 320px, 768px, 1024px (can be more / different according to your analytics)",
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__validator",
    "title": "CSS Validator",
    "priority": "Medium",
    "description": "The CSS was tested and pertinent errors were corrected.",
    "tools": [
      {
        "title": "CSS Validator",
        "url": "https://jigsaw.w3.org/css-validator/"
      }
    ],
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__desktop-bowsers",
    "title": "Desktop Browsers",
    "priority": "High",
    "description": "All pages were tested on all current desktop browsers (Safari, Firefox, Chrome, Internet Explorer, EDGE...)",
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__mobile-browsers",
    "title": "Mobile Browsers",
    "priority": "High",
    "description": "All pages were tested on all current mobile browsers (Native browser, Chrome, Safari...)",
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__os",
    "title": "OS",
    "priority": "High",
    "description": "All pages were tested on all current OS (Windows, Android, iOS, Mac...)",
    "tags": ["all", "css", "testing"]
  },
  {
    "id": "css__reading-direction",
    "title": "Reading direction",
    "priority": "High",
    "description": "All pages need to be tested for LTR and RTL languages if they need to be supported.",
    "documentation": [
      {
        "title": "Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks",
        "url": "https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/"
      },
      {
        "title": "Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks",
        "url": "https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-2/"
      }
    ],
    "tags": ["all", "css", "testing"]
  }
];
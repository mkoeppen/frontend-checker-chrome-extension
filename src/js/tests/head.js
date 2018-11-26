export default [
  {
    "id": "head__doctype",
    "title": "Doctype",
    "priority": "High",
    "description": "The Doctype is HTML5 and is at the top of all your HTML pages.",
    "code": "https://gist.github.com/thedaviddias/bccee9f4dfa728830cf38bb83838d2d3.js",
    "documentation": [
      {
        "title": "Determining the character encoding - HTML5 W3C",
        "url": "https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__charset",
    "title": "Charset",
    "priority": "High",
    "description": "The charset declared (UTF-8) is declared correctly.",
    "code": "https://gist.github.com/thedaviddias/7074c2b93faf1ad1f0c2792258a9b060.js",
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__viewport",
    "title": "Viewport",
    "priority": "High",
    "description": "The viewport is declared correctly.",
    "code": "https://gist.github.com/thedaviddias/0e25ffd442512c79af684b5042366a3c.js",
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__title",
    "title": "Title",
    "priority": "High",
    "description": "A title is used on all pages",
    "detail": "SEO: Google calculates the pixel width of the characters used in the title and cuts off between 472 and 482 pixels. Average character limit would be around 55 characters",
    "code": "https://gist.github.com/thedaviddias/65d0df3b6e2ebcb0d3c738b40f6ff313.js",
    "documentation": [
      {
        "title": "Title - HTML - MDN",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title"
      }
    ],
    "tools": [
      {
        "title": "SERP Snippet Generator",
        "url": "https://www.sistrix.com/serp-snippet-generator/"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__description",
    "title": "Description",
    "priority": "High",
    "description": "A meta description is provided, it is unique and doesn't possess more than 150 characters.",
    "code": "https://gist.github.com/thedaviddias/8f3c61ed6cf08b75524d977828337c62.js",
    "documentation": [
      {
        "title": "Meta Description - HTML - MDN",
        "url": "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__favicons",
    "title": "Favicons",
    "priority": "Medium",
    "description": "Each favicon has been created and displays correctly.",
    "detail": "If you have only a favicon.ico, put it at the root of your site. Normally you won't need to use any markup. However, it's still good practice to link to it using the example below. Today, PNG format is recommended over .ico format (dimensions: 32x32px).",
    "code": "https://gist.github.com/thedaviddias/dd4e98c10283d310d24f22dfc49f1aaf.js",
    "documentation": [
      {
        "title": "Favicon Cheat Sheet",
        "url": "https://github.com/audreyr/favicon-cheat-sheet"
      },
      {
        "title": "Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS Tricks",
        "url": "https://css-tricks.com/favicon-quiz/"
      },
      {
        "title": "PNG favicons - caniuse",
        "url": "https://caniuse.com/#feat=link-icon-png"
      }
    ],
    "tools": [
      {
        "title": "Favicon Generator",
        "url": "https://www.favicon-generator.org/"
      },
      {
        "title": "RealFaviconGenerator",
        "url": "https://realfavicongenerator.net/"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__apple-web-app-meta",
    "title": "Apple Web App Meta",
    "priority": "Low",
    "description": "Apple meta-tags are present.",
    "code": "https://gist.github.com/thedaviddias/4fbbc4c83cd76ebd0d2f18cc1b40f1a9.js",
    "documentation": [
      {
        "title": "Configuring Web Applications",
        "url": "https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html"
      },
      {
        "title": "Supported Meta Tags",
        "url": "https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__windows-tiles",
    "title": "Windows Tiles",
    "priority": "Low",
    "description": "Windows tiles are present and linked.",
    "code": "https://gist.github.com/thedaviddias/4cc20da1a32d201f8dd46edf47d7fb73.js",
    "documentation": [
      {
        "title": "Browser configuration schema reference",
        "url": "https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__canonical",
    "title": "Canonical",
    "priority": "Medium",
    "description": "Use rel=\"canonical\" to avoid duplicate content.",
    "code": "https://gist.github.com/thedaviddias/832a59506fd93e84d62dce0238b0cb23.js",
    "documentation": [
      {
        "title": "Use canonical URLs - Search Console Help - Google Support",
        "url": "https://support.google.com/webmasters/answer/139066?hl=en"
      },
      {
        "title": "5 common mistakes with rel=canonical - Google Webmaster Blog",
        "url": "https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html"
      }
    ],
    "tags": ["all", "Meta tag"]
  },
  {
    "id": "head__language-attribute",
    "title": "Language attribute",
    "priority": "High",
    "description": "The <code>lang</code> attribute of your website is specified and related to the language of the current page.",
    "code": "",
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__direction-attribute",
    "title": "Direction attribute",
    "priority": "Medium",
    "description": "The direction of lecture is specified on the html tag (It can be used on another HTML tag).",
    "code": "",
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__alternate-language",
    "title": "Alternate language",
    "priority": "Low",
    "description": "The language tag of your website is specified and related to the language of the current page.",
    "code": "",
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__conditional-comments",
    "title": "Conditional comments",
    "priority": "Low",
    "description": "Conditional comments are present for IE if needed.",
    "documentation": [
      {
        "title": "About conditional comments (Internet Explorer) - MSDN - Microsoft",
        "url": "https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx"
      }
    ],
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__rss-feed",
    "title": "RSS feed",
    "priority": "Low",
    "description": "If your project is a blog or has articles, an RSS link was provided.",
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__inline-critical-css",
    "title": "Inline critical CSS",
    "priority": "Medium",
    "description": "The inline critical CSS is correctly injected in the HEAD.",
    "detail": "The CSS critical (or above the fold) collects all the CSS used to render the visible portion of the page. It is embedded before your principal CSS call and between `<style></style>` in a single line (minified).",
    "tools": [
      {
        "title": "Critical by Addy Osmani on GitHub automates this.",
        "url": "https://github.com/addyosmani/critical"
      }
    ],
    "tags": ["all", "HTML tag", "CSS", "Performance"]
  },
  {
    "id": "head__css-order",
    "title": "CSS order",
    "priority": "High",
    "description": "All CSS files are loaded before any JavaScript files in the HEAD",
    "detail": "(Except the case where sometimes JS files are loaded asynchronously on top of your page)",
    "tags": ["all", "HTML tag"]
  },
  {
    "id": "head__facebook-open-graph",
    "title": "Facebook Open Graph",
    "priority": "Low",
    "description": "",
    "detail": "All Facebook Open Graph (OG) are tested and no one is missing or with a false information. Images need to be at least 600 x 315 pixels, although 1200 x 630 pixels is recommended. Using og:image:width and og:image:height will specify the image dimensions to the crawler so that it can render the image immediately without having to asynchronously download and process it.",
    "code": "",
    "documentation": [
      {
        "title": "A Guide to Sharing for Webmasters",
        "url": "https://developers.facebook.com/docs/sharing/webmasters/"
      },
      {
        "title": "Best Practices - Sharing",
        "url": "https://developers.facebook.com/docs/sharing/best-practices/"
      }
    ],
    "tools": [
      {
        "title": "Test your page with the Facebook OG testing",
        "url": "https://developers.facebook.com/tools/debug/"
      }
    ],
    "tags": ["all", "Social meta", "testing"]
  },
  {
    "id": "head__twitter-card",
    "title": "Twitter Card",
    "priority": "Low",
    "description": "",
    "documentation": [
      {
        "title": "Getting started with cards — Twitter Developers",
        "url": "https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started"
      }
    ],
    "tools": [
      {
        "title": "Test your page with the Twitter card validator",
        "url": "https://cards-dev.twitter.com/validator"
      }
    ],
    "tags": ["all", "Social meta", "testing"]
  }
];

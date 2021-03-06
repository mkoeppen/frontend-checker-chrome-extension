import ImagesAlternativeTextTest from './images/test.images.alternative-text';

export default [
  {
    "id": "images__optimization",
    "title": "Optimization",
    "priority": "High",
    "description": "All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage)",
    "tools": [
      {
        "title": "Imagemin",
        "url": "https://github.com/imagemin/imagemin"
      },
      {
        "title": "Use ImageOptim to optimise your images for free.",
        "url": "https://imageoptim.com/"
      },
      {
        "title": "Use Kraken.io awesome alternative for both png and jpg optimization. Up to 1mb per files on free plan.",
        "url": "https://kraken.io/web-interface"
      }
    ],
    "tags": ["all", "images", "best practices"]
  },
  {
    "id": "images__picture-srcset",
    "title": "Picture/Srcset",
    "priority": "Medium",
    "description": "You use picture/srcset to provide the most appropriate image for the current viewport of the user.",
    "documentation": [
      {
        "title": "How to Build Responsive Images with srcset",
        "url": "https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/"
      }
    ],
    "tags": ["all", "images"]
  },
  {
    "id": "images__retina",
    "title": "Retina",
    "priority": "Low",
    "description": "You provide layout images 2x or 3x, support retina display.",
    "tags": ["all", "images"]
  },
  {
    "id": "images__sprite",
    "title": "Sprite",
    "priority": "Medium",
    "description": "Small images are in a sprite file (in the case of icons, they can be in an SVG sprite image).",
    "tags": ["all", "images"]
  },
  {
    "id": "images__width-and-height",
    "title": "Width and Height",
    "priority": "High",
    "description": "Set width and height attributes on <img> if the final rendered image size is known (can be omitted for CSS sizing).",
    "tags": ["all", "images"]
  },
  {
    "id": "images__alternative-text",
    "title": "Alternative text",
    "priority": "High",
    "description": "All <img> have an alternative text which describe the image visually.",
    "documentation": [
      {
        "title": "Alt-texts: The Ultimate Guide",
        "url": "https://axesslab.com/alt-texts/"
      }
    ],
    "tags": ["all", "images"],
    "automatedTest": ImagesAlternativeTextTest
  },
  {
    "id": "images__lazy-loading",
    "title": "Lazy loading",
    "priority": "Medium",
    "description": "Images are lazyloaded (A noscript fallback is always provided).",
    "tags": ["all", "images", "performance"]
  }
];
import marked from 'marked';
import fm from 'front-matter';
import debounce from 'debounce';
var beautify_html = require('js-beautify').html;

var dummy = `---
name: Chunliang Lyu
website: https://chunlianglyu.com
email: hi@chunlianglyu.com
github: cllu
---

# Chunliang Lyu

## EDUCATION

### [The Chinese University of Hong Kong], Ph.D. {2011 - 2016}
- Research Area: Entity Retrieval, Natural Language Processing, Knowledge Graph.

### National Taiwan University of Science and Technology, Visiting Student {2011 - 2011}

### [Beijing Institute of Technology], B.S. in Information Engineering, GPA 3.9 {2007 - 2011}

## PROJECTS

### [Hyperlink] (https://hyperlinkapp.com), Co-founder {2014 - 2015}
Hyperlink is a unified platform for searching and managing personal information streams across 13 online
services, such as social updates from Twitter and cloud files from Dropbox.

- Developed the backend in Python 3, with Flask/PostgreSQL/ElasticSearch/Celery as main stack.
- Designed the frontend usingAngularJS, including extensive unit and end-to-end testing.
- Deployed and optimized the system onAmazon Web Services to support up to 10K concurrent users.

### SwitchPal, Project Leader {2014 - 2015}
SwitchPal is a device that snaps over an existing switch and turn it into a smart one. Equipped with multiple
sensors, it can automate household appliances according to personal preferences.

- Designed the hardware based on the TI CC2540 MCU, controllable via a custom Bluetooth 4.0 profile.
- Implemented and released the iOS andAndroid companion apps.
- Saved more than 2/3 electricity by deploying to student hostels to automatically control the air conditioners.

### Entity Modeling and Retrieval System, Principle Researcher {2012 - 2015}
Proposed a novel entity retrieval system based on entity factoid hierarchy, together with a new entity model
considering the HTML structure in webpages. Significantly improved the state-of-the-art performance.

- Consolidated information about millions of entities from ClueWeb09 (25TB), Freebase (380GB) and DBpedia.
- Designed an entity processing pipeline based on Spark, decreasing the processing time from days to hours.
- Implemented multiple retrieval models in Lucene, with customized query analyzer to handle entity queries.

### Twitter Recommendation System, Principle Researcher {2011 - 2012}
Built a personalized tweets recommendation system based on user profiles, achieved superior performance.

- Constructed user profiles by aggregating keywords in tweets and propagating interests among friends.
- Crawled millions of tweets from hundreds of thousands of Twitter users to test the system.

## TECHNICAL SKILLS

- Language: Scala, Python, Java, JavaScript, PHP, C++
- Database: PostgreSQL, MongoDB, MySQL
- Framework: ElasticSearch, Lucene, Hadoop, Spark, ReactJS, AngularJS
- Tool: Git, Gulp, Linux, Docker, Amazon Web Services

## EXPERIENCE

- Semifinalist in the 2015 Global Venture Labs Investment Competition, 2015
- TeachingAssistant for four undergraduate engineering courses at CUHK, 2012-2015
- Volunteer for the Charles K Kao Foundation for Alzheimer's Disease, 2011
- Organizer of the 6th Information Security and Countermeasures Contest, 2010
- Meritorious Winner in Mathematical Contest In Modeling, 2009

## SELECTED PUBLICATIONS

- C. Lu, W. Lam, Y. Liao. Entity Retrieval via Entity Factoid Hierarchy. In: Proceedings of the 53rd Annual
  Meeting of the Association for Computational Linguistics (ACL). 2015.
- C. Lu, L. Bing, W. Lam. Structured Positional Entity Language Model for Enterprise Entity Retrieval. In:
  Proceedings of the 22nd ACM Conference on Information and Knowledge Management (CIKM). 2013.

[The Chinese University of Hong Kong]: https://www.cuhk.edu.hk/ (alumniOf)
[Beijing Institute of Technology]: http://bit.edu.cn/ (alumniOf)
[Hyperlink]: https://hyperlinkapp.com/ (worksFor)
`;

const htmlTemplate = (name, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">

  <meta name="author" content="${name}">
  <title>${name} — Resume</title>
  <link rel="shortcut icon" href="/favicon.ico"/>
  <link rel="stylesheet" type="text/css" href="styles/resume.css">
  <script src="scripts/details.polyfill.js"></script>
</head>
<body>

<main class="page" itemscope itemtype="http://schema.org/Person">
${content}
</main>

</body>
</html>`;

function render(text) {
  var content = fm(text);
  var meta = content.attributes;

  var sectionOpened = false;
  var detailsOpened = false;

  // the date span may appear in a <summary> element(third heading)
  const dateRe = /{\d{4}(?: - \d{4})?}/;

  var name = meta.name;

  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    var html = '';
    switch (level) {
      case 1:
        // the top level heading is for title and contact information
        html += `<section class="basic">\n<h1 itemprop="name">${text}</h1>\n<ul>\n`;
        // render attributes
        if (meta.website) {
          html += `<li><a href="${meta.website}" itemprop="url">${meta.website}</a></li>\n`;
        }
        if (meta.email) {
          html += `<li><a href="${meta.website}" itemprop="email">${meta.email}</a></li>\n`;
        }
        if (meta.github) {
          var githubLink = 'github.com/'+meta.github;
          html += `<li><a href="https://${githubLink}" itemprop="sameAs">${githubLink}</a></li>\n`;
        }
        html += '</ul>\n</section>\n';

        if (!name) {
          name = text;
        }
        break;

      case 2:
        // check if a details if opened
        if (detailsOpened) {
          html += "\n</details>\n";
          detailsOpened = false;
        }

        // if there is a previous section that is not closed, close it first
        if (sectionOpened) {
          html += "</section>\n";
        }

        // then add a new section, with appropriate class
        html += `<section class="${text.toLowerCase()}">\n`;
        html += `<h2>${text}</h2>`;
        sectionOpened = true;
        break;

      case 3:
        if (detailsOpened) {
          html += "\n</details>\n";
        }

        var match = dateRe.exec(text);
        var summary;
        if (match != null) {
          summary = text.replace(match[0], '') + `<time>${match[0].replace(/[{}]/g, '')}</time>`;
        } else {
          summary = text;
        }
        html += `<details open>\n<summary>${summary}</summary>\n`;
        detailsOpened = true;
    }
    return html;
  };
  renderer.link = function(href, title, text) {
    switch (title) {
      case 'alumniOf':
        return `<span itemprop="alumniOf" itemscope itemtype="http://schema.org/EducationalOrganization">
                <link href="${href}" itemprop="url">
                <span itemprop="name">${text}</span>
              </span>`;
      case 'worksFor':
        return `<span itemprop="worksFor" itemscope itemtype="http://schema.org/Organization">
                <link href="${href}" itemprop="url">
                <span itemprop="name">${text}</span>
              </span>`;
      default:
        var out = '<a href="' + href + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    }
  };

  var options = {
    renderer: renderer,
    gfm: true
  };
  var html = marked(content.body, options);

  if (detailsOpened) {
    html += "\n</details>\n";
  }
  // if there is a previous section that is not closed
  if (sectionOpened) {
    html += "</section>\n";
  }
  return htmlTemplate(name, html);
}

var previewElement = document.getElementById('preview');
var iframe = document.createElement('iframe');
previewElement.appendChild(iframe);
var sourceElement = document.getElementById('source');

function updatePreview() {
  var rendered = render(editor.getValue());

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(rendered);
  iframe.contentWindow.document.close();
}

// on page load
var editor = CodeMirror(document.getElementById('editor'), {
  value: dummy,
  mode: "gfm",
  //lineNumbers: true,
  lineWrapping: true
});
editor.setSize("600px", "100%");

editor.on('change', function() {
  updatePreview();
});
updatePreview();

var resizeEditor = debounce((width, height) => {
  editor.setSize(width, height);
}, 300);

var resizer = document.getElementById('resizer');
var isResizing = false;
var mouseDownX = 600;
var editorWidth = 600;
resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  iframe.style.pointerEvents = 'none';
  mouseDownX = e.clientX;
  editorWidth = resizer.offsetLeft;
});
document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  // calling resizeEditor is too costly
  editor.getWrapperElement().style.width = (editorWidth + e.clientX - mouseDownX) + 'px';
});
document.addEventListener('mouseup', (e) => {
  if (isResizing) {
    isResizing = false;
    iframe.style.pointerEvents = 'auto';
    editorWidth = editorWidth + e.clientX - mouseDownX;
    resizeEditor(editorWidth);
  }
});

const editorToggle = document.getElementById('toggle-editor');
editorToggle.addEventListener('click', (e) => {
  if (editorToggle.className == 'on') {
    editorToggle.className = 'off';
    document.querySelector('aside').style.display = 'none';
  } else {
    editorToggle.className = 'on';
    document.querySelector('aside').style.display = 'block';
  }
});

const codeToggle = document.getElementById('toggle-code');
codeToggle.addEventListener('click', (e) => {
  if (codeToggle.className == 'on') {
    codeToggle.className = 'off';
    sourceElement.style.display = "none";
  } else {
    var rendered = render(editor.getValue());
    sourceElement.innerHTML = beautify_html(rendered, { indent_size: 2 }).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    hljs.highlightBlock(sourceElement);

    codeToggle.className = 'on';
    sourceElement.style.display = "block";
  }
});

document.getElementById('download').addEventListener('click', (e) => {
  if (e.target.tagName != 'I') return false;
  var holder = e.target.querySelector('a');
  holder.setAttribute('href', 'data:text/plain;charset=utf8,' + encodeURIComponent(beautify_html(render(editor.getValue()))));
  holder.click();
});

export default render;

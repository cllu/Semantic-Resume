import marked from 'marked';
import fm from 'front-matter';

const htmlTemplate = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">

  <meta name="author" content="Chunliang Lyu">
  <title>Chunliang Lyu — Resume</title>
  <link rel="shortcut icon" href="/favicon.ico"/>
  <link rel="stylesheet" type="text/css" href="styles/resume.css">
  <script src="scripts/resume.js"></script>

</head>
<body>

<main class="page" itemscope itemtype="http://schema.org/Person">
${content}
</main>

</body>
</html>
`;

function render(text) {
  var content = fm(text);
  var meta = content.attributes;

  var sectionOpened = false;
  var detailsOpened = false;

  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    var html = '';
    switch (level) {
      case 1:
        // the top level heading is for title and contact information
        html += `<section class="basic">\n<h1>${text}</h1>\n<ul>\n`;
        // render attributes
        if (meta.website) {
          html += `<li><a href="${meta.website}">${meta.website}</a></li>\n`;
        }
        if (meta.email) {
          html += `<li><a href="${meta.website}">${meta.email}</a></li>\n`;
        }
        if (meta.github) {
          var githubLink = 'https://github.com/'+meta.github;
          html += `<li><a href="${githubLink}">${githubLink}</a></li>\n`;
        }
        html += '</section>\n';
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

        html += `<details open>\n<summary>${text}</summary>\n`;
        detailsOpened = true;
    }
    return html;
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
  return htmlTemplate(html);
}

var previewElement = document.getElementById('preview');
var iframe = document.createElement('iframe');
previewElement.appendChild(iframe);

function updatePreview() {
  var rendered = render(editor.getValue());
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(rendered);
  iframe.contentWindow.document.close();
}

// on page load
var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  mode: "gfm",
  lineNumbers: true
});
editor.setSize("600px", "100%");

editor.on('change', function() {
  updatePreview();
});
updatePreview();

export default render;

import fm from 'front-matter';
import marked from 'marked';

const htmlTemplate = (name, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">

  <meta name="author" content="${name}">
  <title>${name} — Resume</title>
  <link rel="shortcut icon" href="/favicon.ico"/>
  <link rel="stylesheet" href="styles/resume.css">
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

  const markedOptions = {
    renderer: renderer,
    gfm: true
  };
  var html = marked(content.body, markedOptions);

  if (detailsOpened) {
    html += "\n</details>\n";
  }
  // if there is a previous section that is not closed
  if (sectionOpened) {
    html += "</section>\n";
  }
  return htmlTemplate(name, html);
}

export default render;

import debounce from 'debounce';
import render from './renderer';
var beautify_html = require('js-beautify').html;

// sample markdown text
var dummy = require("!!raw!../resume.md");

// polyfill js and stylesheets that will be injected to a self-contained HTML
var polyfill = require("!!raw!./polyfill.min.js");
var stylesheet = require("!!raw!../styles/resume.min.css");

// create the iFrame
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

// allow user to drag to resize the width of the editor
function registerResizer(resizer) {
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
      editor.setSize(editorWidth);
    }
  });
}

registerResizer(document.getElementById('resizer'));

// toggle editor
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

// toggle the preview between iframe and HTML source
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

// generate a self-contained HTML file for download
document.getElementById('download').addEventListener('click', (e) => {
  if (e.target.tagName != 'I') return false;
  var holder = e.target.querySelector('a');
  var rendered = beautify_html(render(editor.getValue()));
  rendered = rendered.replace('<script src="scripts/details.polyfill.js"></script>', `<script>${polyfill}</script>`);
  rendered = rendered.replace('<link rel="stylesheet" href="styles/resume.css">', `<style>${stylesheet}</style>`);
  console.log(rendered);
  holder.setAttribute('href', 'data:text/plain;charset=utf8,' + encodeURIComponent(rendered));
  holder.click();
});

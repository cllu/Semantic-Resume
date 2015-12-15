import debounce from 'debounce';
import classnames from 'classnames';
import render from './renderer';
var beautify_html = require('js-beautify').html;

// sample markdown text
var dummy = require("!!raw!../resume.md");

// polyfill js and stylesheets that will be injected to a self-contained HTML
var polyfill = require("!!raw!./polyfill.min.js");
var stylesheet = require("!!raw!../styles/resume.min.css");

// on page load
var editor;

var Editor = React.createClass({
  componentDidMount() {
    editor = CodeMirror(document.getElementById('editor'), {
      value: this.props.text,
      mode: "gfm",
      //lineNumbers: true,
      lineWrapping: true
    });
    editor.setSize("600px", "100%");

    editor.on('change', () => {
      this.props.onTextChange(editor.getValue());
    });
    //updatePreview();
  },

  render() {
    return (
      <div id="editor"></div>
    );
  }
});

var Source = React.createClass({
  componentDidMount() {
    hljs.highlightBlock(ReactDOM.findDOMNode(this));
  },
  render() {
    return (
      <pre>{beautify_html(this.props.html, { indent_size: 2 })}</pre>
    )
  }
});

var Frame = React.createClass({
  setHtml(html) {
    var doc = ReactDOM.findDOMNode(this).contentDocument;
    doc.open();
    doc.write(html);
    doc.close();
  },
  componentDidMount() {
    this.setHtml(this.props.html);
  },
  componentWillReceiveProps(nextProps) {
    this.setHtml(nextProps.html);
  },
  render() {
    return <iframe />;
  }
});

var iframe;

var Preview = React.createClass({
  render() {
    return (
      <div id="preview">
        {this.props.showSource ?
          <Source html={this.props.html} id="source"/> :
          <Frame html={this.props.html}/>
        }
      </div>
    )
  }
});

var Footer = React.createClass({
  render() {
    return (
      <footer>
        <p>
          Made by <a href="https://chunlianglyu.com/">Chunliang Lyu</a>,
          check <a href="https://github.com/cllu/Semantic-Resume">the source code</a>.
        </p>
      </footer>
    );
  }
});

var App = React.createClass({

  getInitialState() {
    return {
      showEditor: true,
      showSource: false,
      text: localStorage.resumeText || dummy,
      html: ''
    }
  },

  onTextChange(text) {
    localStorage.resumeText = text;
    this.setState({html: render(text)});
  },

  componentDidMount() {
    this.onTextChange(this.state.text);
  },

  toggleEditor() {
    if (this.state.showEditor) {
      document.querySelector('aside').style.display = 'none';
    } else {
      document.querySelector('aside').style.display = 'block';
    }
    this.setState({showEditor: !this.state.showEditor});
  },
  toggleSource() {
    this.setState({showSource:!this.state.showSource});
  },

  downloadHTML(e) {
    var holder = e.target.querySelector('a');
    var rendered = beautify_html(render(editor.getValue()));
    rendered = rendered.replace('<script src="scripts/details.polyfill.js"></script>', `<script>${polyfill}</script>`);
    rendered = rendered.replace('<link rel="stylesheet" href="styles/resume.css">', `<style>${stylesheet}</style>`);
    holder.setAttribute('href', 'data:text/plain;charset=utf8,' + encodeURIComponent(rendered));
    holder.click();
  },

  render() {
    return (
      <main>
        <aside>
          <Editor text={this.state.text} onTextChange={this.onTextChange}/>
          <Footer/>
        </aside>

        <div id="resizer"></div>
        <Preview html={this.state.html} showSource={this.state.showSource}/>

        <ul id="actions">
          <li id="toggle-editor"
              title="Toggle Editor"
              className={classnames({'on':this.state.showEditor, 'off':!this.state.showEditor})}
              onClick={this.toggleEditor}>
            <i className="fa fa-clipboard"/>
          </li>
          <li id="toggle-code"
              title="Toggle HTML Source"
              className={classnames({'on':this.state.showSource, 'off':!this.state.showSource})}
              onClick={this.toggleSource}>
            <i className="fa fa-code"/>
          </li>
          <li id="download" title="Download HTML Resume">
            <i className="fa fa-download" onClick={this.downloadHTML}><a download="resume.html"/></i>
          </li>
        </ul>
      </main>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);

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

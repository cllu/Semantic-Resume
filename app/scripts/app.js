import debounce from 'debounce';
import render from './renderer';
import React from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';

var beautify_html = require('js-beautify').html;

// sample markdown text
var dummy = require("!!raw!../resume.md");

// polyfill js and stylesheets that will be injected to a self-contained HTML
var polyfill = require("!!raw!./polyfill.min.js");
var stylesheet = require("!!raw!../styles/resume.min.css");

var Editor = React.createClass({

  componentDidMount() {
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorWidth != this.props.editorWidth) {
      this.editor.setSize(nextProps.editorWidth);
    }
  },

  createEditor(ref) {
    // if we have already got an editor instance
    if (this.editor) return;

    this.editor = CodeMirror(ref, {
      value: this.props.text,
      mode: "gfm",
      lineWrapping: true
    });
    this.editor.setSize("600px", "100%");

    this.editor.on('change', () => {
      this.props.onTextChange(this.editor.getValue());
    });
  },

  render() {
    return (
      <div id="editor" ref={(ref) => this.createEditor(ref)}></div>
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

/**
 * Holder for an iFrame with content from props.html
 */
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
    var style = {pointerEvents: this.props.isResizing ? 'none' : 'auto'};
    return <iframe style={style}/>;
  }
});

/**
 * Show the iframe or the source code of the HTML depends on the showSource flag
 */
var Preview = React.createClass({
  render() {
    return (
      <div id="preview">
        {this.props.showSource ?
          <Source html={this.props.html} id="source"/> :
          <Frame html={this.props.html} isResizing={this.props.isResizing}/>
        }
      </div>
    )
  }
});

/**
 * Links
 */
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

/**
 * The main application
 */
var App = React.createClass({

  getInitialState() {
    var text = localStorage.resumeText || dummy;
    return {
      showEditor: true,
      showSource: false,
      editorWidth: 600,
      text: text,
      html: render(text),
      isResizing: false
    }
  },

  onTextChange(text) {
    localStorage.resumeText = text;
    this.setState({html: render(text)});
  },

  onResizerMouseDown(e) {
    this.setState({isResizing: true});
    this._mouseDownX = e.clientX;
    this._editorWidth = this.state.editorWidth;
  },

  onResize(e) {
    if (!this.state.isResizing) return;
    // calling resizeEditor is too costly
    this.setState({editorWidth: this._editorWidth + e.clientX - this._mouseDownX });
  },

  onResizeDone(e) {
    if (this.state.isResizing) {
      this.setState({
        editorWidth: this._editorWidth + e.clientX - this._mouseDownX,
        isResizing: false
      });
    }
  },

  componentDidMount() {
    document.addEventListener('mousemove', this.onResize);
    document.addEventListener('mouseup', this.onResizeDone);
  },

  componentWillUnmount() {
    document.removeEventListener('mouseover', this.onResize);
    document.removeEventListener('mouseup', this.onResizeDone);
  },

  toggleEditor() {
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
        <aside style={{display: this.state.showEditor ? 'block' : 'none'}}>
          <Editor text={this.state.text}
                  onTextChange={this.onTextChange}
                  editorWidth={this.state.editorWidth}/>
          <Footer/>
        </aside>

        <div id="resizer" onMouseDown={this.onResizerMouseDown}></div>

        <Preview html={this.state.html} showSource={this.state.showSource} isResizing={this.state.isResizing}/>

        <ul id="actions">
          <li id="toggle-editor"
              title="Toggle Editor"
              className={this.state.showEditor ? 'on' : 'off'}
              onClick={this.toggleEditor}>
            <i className="fa fa-clipboard"/>
          </li>
          <li id="toggle-code"
              title="Toggle HTML Source"
              className={this.state.showSource ? 'on' : 'off'}
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

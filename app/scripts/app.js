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

// define a mixed mode handling the YAML front matter
CodeMirror.defineMode("resume", function (config, parserConfig) {
  var gfmMode = CodeMirror.getMode(config, {
    name: "gfm"
  });

  var yamlMode = CodeMirror.getMode(config, {name: "yaml"});

  return {
    startState() {
      var state = gfmMode.startState();
      var yamlState = yamlMode.startState();
      return {
        firstLine: true,
        mode: gfmMode,
        markdownState: state,
        yamlState: yamlState
      };
    },
    copyState(state) {
      return {
        mode: state.mode,
        markdownState: gfmMode.copyState(state.markdownState),
        yamlState: state.yamlState
      };
    },
    token (stream, state) {
      if(state.firstLine && stream.match(/---/, false)) {
        state.firstLine = false;
        state.mode = yamlMode;
        return yamlMode.token(stream, state.yamlState);
      } else if (state.mode == yamlMode && stream.match(/---/, false)) {
        state.mode = gfmMode;
        return yamlMode.token(stream, state.yamlState);
      } else {
        return state.mode.token(stream, state.markdownState);
      }
    },
    innerMode(state) {
      if (state.mode == gfmMode) {
        return gfmMode.innerMode(state.markdownState);
      } else {
        return {mode: yamlMode, state: state};
      }
    }
  };
});

var Editor = React.createClass({

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 88 && e.altKey) {
        console.log('toggle vim mode');
        if (this.editor.getOption('keyMap') == 'default') {
          this.editor.setOption('keyMap', 'vim');
        } else {
          this.editor.setOption('keyMap', 'default');
        }
        e.preventDefault();
      }
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorWidth != this.props.editorWidth) {
      this.editor.setSize(nextProps.editorWidth);
      this.editor.refresh();
    }
  },

  createEditor(ref) {
    // if we have already got an editor instance
    if (this.editor) return;

    this.editor = CodeMirror(ref, {
      value: this.props.text,
      mode: "resume",
      keyMap: 'default',
      matchBrackets: true,
      styleActiveLine: true,
      lineWrapping: true
    });

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
          Made by <a href="https://chunlianglyu.com/" target="_blank">Chunliang Lyu</a>,
          check <a href="https://github.com/cllu/Semantic-Resume" target="_blank">the source code</a>.
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
    var html = '', message = '';
    try {
      html = render(text);
    } catch (err) {
      message = 'The YAML front matter is not valid';
    }
    return {
      showEditor: true,
      showSource: false,
      editorWidth: 600,
      text: text,
      html: html,
      message: message,
      isResizing: false
    }
  },

  onTextChange(text) {
    localStorage.resumeText = text;
    try {
      var html = render(text);
      this.setState({
        html: html,
        message: ''
      });
    } catch (err) {
      this.setState({message: 'The YAML front matter is not valid'});
    }
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
    var holder = e.target.parentNode.querySelector('a');
    var rendered = beautify_html(this.state.html);
    rendered = rendered.replace('<script src="scripts/polyfill.js"></script>', `<script>${polyfill}</script>`);
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
          <li id="toggle-editor" title="Toggle Editor" className={this.state.showEditor ? 'on' : 'off'}>
            <i className="fa fa-clipboard" onClick={this.toggleEditor}/>
          </li>
          <li id="toggle-code" title="Toggle HTML Source" className={this.state.showSource ? 'on' : 'off'}>
            <i className="fa fa-code" onClick={this.toggleSource}/>
          </li>
          <li id="download" title="Download HTML Resume">
            <i className="fa fa-download" onClick={this.downloadHTML}/>
            <a download="resume.html"/>
          </li>
        </ul>

        <div className="message" style={{display: this.state.message ? 'block' : 'none'}}>{this.state.message}</div>
      </main>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('container')
);

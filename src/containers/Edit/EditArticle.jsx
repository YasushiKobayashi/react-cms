/* @flow */
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/keymap/sublime';

import { request } from '../../utils';

import { DropZone } from '../../parts';

import './EditArticle.scss';

export default class EditArticle extends Component {
  props: {
    content: string;
    htmlContent: string;
    tabValue: string;
    tabMark: string;
    tabHtml: string;
    handleContent: Function;
    handleTab: Function;
  };
  state: {
    isDropZone: boolean,
  };
  mdEditor: any;
  htmlEditor: any;
  handleChange: Function;
  setState: Function;
  handleUploadImage: Function;
  handleDrag: Function;

  constructor() {
    super();
    this.state = {
      isDropZone: false,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const editor = {
      lineNumbers: true,
      lineWrapping: true,
      smartIndent: true,
      matchBrackets: true,
      dragDrop: true,
      indentUnit: 4,
      theme: 'monokai',
      keyMap: 'sublime',
    };

    const mdEditor = {
      mode: 'markdown',
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
      },
    };
    this.mdEditor = CodeMirror.fromTextArea(this.refs.mdEditor,
      _.merge(editor, mdEditor),
    );
    this.mdEditor.on('change', this.handleChange);
    this.mdEditor.on('cursorActivity', this.handleChange);
    this.mdEditor.on('dragstart', this.handleDrag);
    this.mdEditor.on('dragover', this.handleDrag);

    const htmlEditor = {
      mode: 'text/html',
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
      },
    };
    this.htmlEditor = CodeMirror.fromTextArea(this.refs.htmlEditor,
      _.merge(editor, htmlEditor),
    );
    this.htmlEditor.on('change', this.handleChange);
    this.htmlEditor.on('dragstart', this.handleDrag);
    this.htmlEditor.on('dragover', this.handleDrag);
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.content !== nextProps.content) {
      const oldCursor = this.mdEditor.getCursor();
      this.mdEditor.setValue(nextProps.content);
      this.mdEditor.setCursor(oldCursor);
    }

    if (this.props.htmlContent !== nextProps.htmlContent) {
      const oldCursor = this.htmlEditor.getCursor();
      this.htmlEditor.setValue(nextProps.htmlContent);
      this.htmlEditor.setCursor(oldCursor);
    }
  }

  handleChange() {
    const {
      handleContent,
      tabValue,
      tabMark,
    } = this.props;
    const { mdEditor, htmlEditor } = this;

    const val = (tabValue === tabMark) ? mdEditor.getValue() : htmlEditor.getValue();
    handleContent(val);
  }

  handleUploadImage(file: any) {
    const { tabValue, tabMark } = this.props;
    (async () => {
      try {
        const upload = await request.UPLOAD('post/upload', file);
        const imagePath = upload.path;
        if (tabValue === tabMark) {
          const addStr = `\n![](${imagePath})\n`;
          const oldCursor = this.mdEditor.getCursor();
          this.mdEditor.replaceRange(addStr, oldCursor);
        } else {
          const addStr = `\n<p><img src="${imagePath}" ></p>\n`;
          const oldCursor = this.htmlEditor.getCursor();
          this.htmlEditor.replaceRange(addStr, oldCursor);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }

  handleDrag() {
    this.setState({
      isDropZone: !this.state.isDropZone,
    });
  }

  render() {
    const {
      tabMark,
      tabHtml,
      handleTab,
      tabValue,
    } = this.props;
    const { isDropZone } = this.state;

    return (
      <div styleName='content'>
        <Tabs
          value={tabValue}
          onChange={handleTab}
          style={{ width: '100%' }}
        >
          <Tab label={tabMark} value={tabMark}>
            <div styleName='contentTab'>
              <textarea
                ref='mdEditor'
              />
            </div>
          </Tab>
          <Tab label={tabHtml} value={tabHtml}>
            <div styleName='contentTab'>
              <textarea
                ref='htmlEditor'
              />
            </div>
          </Tab>
        </Tabs>
        <DropZone
          isDropZone={isDropZone}
          tabValue={tabValue}
          handleDragExit={this.handleDrag}
          handleUploadImage={this.handleUploadImage}
        />
      </div>
    );
  }
}

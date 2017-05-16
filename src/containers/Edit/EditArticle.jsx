import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

import { DropZone } from '../../parts';

import './EditArticle.scss';

export default class EditArticle extends Component {
  static propTypes = {
    content: PropTypes.string,
    htmlContent: PropTypes.string,
    tabMark: PropTypes.string.isRequired,
    tabHtml: PropTypes.string.isRequired,
    handleContent: PropTypes.func.isRequired,
    handleUploadImage: PropTypes.func.isRequired,
  }
  static defaultProps = {
    content: '',
    htmlContent: '',
  }

  constructor() {
    super();
    this.state = {
      tabValue: null,
      dropZone: false,
    };

    this.handleTab = this.handleTab.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
  }

  componentWillMount() {
    this.setState({
      tabValue: this.props.tabMark,
    });
  }

  handleTab(value) {
    this.setState({
      tabValue: value,
    });
  }

  handleDragOver() {
    this.setState({
      dropZone: true,
    });
  }

  handleDragExit() {
    this.setState({
      dropZone: false,
    });
  }

  render() {
    const {
      content,
      htmlContent,
      handleContent,
      tabMark,
      tabHtml,
      handleUploadImage,
    } = this.props;
    const { tabValue, dropZone } = this.state;

    return (
      <div styleName='content'>
        <Tabs
          value={tabValue}
          onChange={this.handleTab}
          style={{ width: '100%' }}
        >
          <Tab label={tabMark} value={tabMark}>
            <textarea
              value={content}
              onChange={(event) => { handleContent(event, tabMark); }}
              onDragOver={this.handleDragOver}
            />
          </Tab>
          <Tab label={tabHtml} value={tabHtml}>
            <textarea
              value={htmlContent}
              onChange={(event) => { handleContent(event, tabHtml); }}
              onDragOver={this.handleDragOver}
            />
          </Tab>
        </Tabs>
        <DropZone
          dropZone={dropZone}
          tabValue={tabValue}
          handleDragExit={this.handleDragExit}
          handleUploadImage={handleUploadImage}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';

import './edit-panel.css';

import Panel from './Panel';

class EditPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPanel: false,
      showButtons: false,
    };

    this.mouseTimeout = null;

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onPanelClose = this.onPanelClose.bind(this);
    this.onModifyButtonClick = this.onModifyButtonClick.bind(this);
  }

  onModifyButtonClick() {
    if (!this.state.showButtons) { return; }

    this.setState({ showPanel: true, showButtons: false });
  }

  onMouseEnter() {
    this.mouseTimeout = setTimeout(() => {
      this.setState({ showButtons: true });
    }, 400);
  }

  onMouseLeave() {
    if (this.mouseTimeout) {
      clearTimeout(this.mouseTimeout);
    }

    this.setState({ showButtons: false });
  }

  onPanelClose() {
    this.setState({ showPanel: false });
  }

  render() {
    const { articles, onArticleChange } = this.props;
    const { showPanel, showButtons } = this.state;

    return (
      <div className="edit-panel" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <Panel
          articles={articles}
          showPanel={showPanel}
          onPanelClose={this.onPanelClose}
          onArticleChange={onArticleChange}
        />
        <div className={`button-wrapper ${showButtons ? 'visible' : ''}`}>
          <button className="download-button"></button>
          <button className="modify-button" onClick={this.onModifyButtonClick}>
          </button>
        </div>
      </div>
    );
  }
};

export default EditPanel;
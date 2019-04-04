import React, { Component } from 'react';

import './panel.css';

import { SIZES } from '../Articles/config';

const generateSizesList = () => {
  const list = [];
  Object.keys(SIZES).forEach((key, index) => {
    list.push(<option key={`key-${index}`}>{key}</option>);
  });

  return list;
}

class Panel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      animate: false,
      activeArticle: null,
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
  }

  setActiveArticle(article) {
    this.setState({ activeArticle: article, animate: true });

    setTimeout(() => {
      this.setState({ animate: false });
    }, 300);
  }

  onFileChange(event) {
    const { activeArticle } = this.state;
    const files = Array.from(event.target.files);

    this.props.onArticleChange(activeArticle.id, URL.createObjectURL(files[0]), 'image');
  }

  render() {
    const {
      articles,
      showPanel,
      onPanelClose = () => {},
      onArticleChange = () => {},
    } = this.props;

    const { activeArticle, animate } = this.state;

    const list = articles.map(article => (
      <li
        key={`article-option-${article.id}`}
        onClick={() => this.setActiveArticle(article)}
        className={`article-item ${activeArticle && activeArticle.id === article.id ? 'active' : ''}`}
      >
        <span className="title">{article.title}</span>
      </li>
    ));

    return (
      <div className={`panel ${showPanel ? 'visible' : ''}`}>
        <button className="close" onClick={onPanelClose}></button>
        <div className="content">
          <ul className="article-list">
            {list}
          </ul>
          { activeArticle ?
            <div className={`article-details ${animate ? 'animate' : ''}`}>
              <div className="input-group">
                <label>Heading</label>
                <input
                  type="text"
                  value={activeArticle.title}
                  maxLength={SIZES[activeArticle.type].title}
                  onChange={event => onArticleChange(activeArticle.id, event.target.value, 'title')}
                />
              </div>
              <div className="input-group">
                <label>Type</label>
                <select value={activeArticle.type} onChange={event => onArticleChange(activeArticle.id, event.target.value, 'type')}>
                  {generateSizesList()}
                </select>
              </div>
              <div className="input-group">
                <label>Image</label>
                <label
                  htmlFor="cover-img"
                  className="preview-image"
                  style={activeArticle.image ? { backgroundImage: `url(${activeArticle.image})`, backgroundSize: 'contain' } : {}}
                >
                </label>
                <input type="file" id="cover-img" name="cover-img" accept="image/*" onChange={this.onFileChange} />
              </div>
              <div className="input-group">
                <label>Description</label>
                <textarea
                  value={activeArticle.text}
                  cols="30"
                  rows="6"
                  maxLength={SIZES[activeArticle.type].text}
                  onChange={event => onArticleChange(activeArticle.id, event.target.value, 'text')}
                ></textarea>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default Panel;
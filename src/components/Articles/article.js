import React, { Component } from 'react';

import { SIZES } from './config';

class Article extends Component {

  render() {
    const { article: { title, text, type, image } } = this.props;
    const content = text.substring(0, SIZES[type].text);
    const showMore = content.length < text.length;

    return (
      <article className={type}>
        <h2>{title}</h2>
        { image ?
          <img src={image} alt="story-cover" />
          : null
        }
        <span>
          {`${content.trim()}${showMore ? '...' : ''}`}
        </span>
      </article>
    )
  }
}

export default Article;
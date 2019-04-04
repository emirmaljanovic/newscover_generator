import React, { Fragment } from 'react';

import Article from './article';

import './article.css';

const Articles = ({ articles }) => {
  const list =
    articles.map(article => <Article key={`article-${article.id}`} article={article} />);

  return (
    <Fragment>
      {list}
    </Fragment>
  );
};

export default Articles;
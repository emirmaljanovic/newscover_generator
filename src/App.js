import React, { Component, Fragment } from 'react';

import Header from './components/Header';
import Subtitle from './components/Subtitle';
import Articles from './components/Articles/index.js';
import EditPanel from './components/EditPanel/index.jsx';

import './reset.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };

    this.onArticleChange = this.onArticleChange.bind(this);
  }

  componentWillMount() {
    fetch('./data.json')
      .then(response => response.json())
      .catch(err => console.error(err))
      .then((data) => {
        this.setState({ articles: data });
      });
  }

  onArticleChange(articleId, newValue, prop) {
    if (!prop) {
      console.error('Article property is missing.');
      return;
    }

    const articles = this.state.articles.slice();
    const articleIndex = articles.findIndex(({ id }) => id === articleId);

    if (articleIndex > -1) {
      articles[articleIndex][prop] = newValue;

      this.setState({ articles });
    }
  }

  render() {
    const { articles } = this.state;

    return (
      <Fragment>
        <div className="cover">
          <Header />
          <Subtitle />
          <Articles articles={articles} />
        </div>
        <EditPanel
          articles={articles}
          onArticleChange={this.onArticleChange}
        />
      </Fragment>
    );
  }
}

export default App;

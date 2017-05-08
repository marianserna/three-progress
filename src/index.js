import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Project from './components/Project';
import './css/styles.css';

import { BrowserRouter, Route } from 'react-router-dom';

const Root = function() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Main} />
        <Route path="/projects/:slug" component={Project} />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

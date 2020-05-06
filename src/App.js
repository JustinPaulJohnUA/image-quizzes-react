import React from 'react';
import Home from './components/home.js';
import Category from './components/category.js';
import Quiz from './components/quiz.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path ='/' component={Home} />
        <Route exact path='/quiz' component={Quiz} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;

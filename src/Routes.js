import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeView from './views/Home';
import QuizView from './views/Home/QuizSingle';
import QuizCreateView from './views/Dashboard/QuizCreate';
import QuizEditView from './views/Dashboard/QuizEdit';
import Dashboard from './views/Dashboard';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={HomeView} exact path="/" />
        <Route component={QuizView} exact path="/quiz/:quizId" />
        {/*<Route */}
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={QuizCreateView} exact path="/dashboard/create-quiz" />
        <Route component={QuizEditView} exact path="/dashboard/quiz/:id/edit" />
      </Switch>
    </Router>
  );
}

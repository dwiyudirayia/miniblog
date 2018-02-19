import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './home/Index';
import Login from './auth/Login';
import Register from './auth/Register';

/* A Main React component */
class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Index} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Router>
    );
  }
}

export default Main;

/* The if statement is required so as to Render the component on pages
 * that have a div with an ID of "root";  
 */

if (document.getElementById('root')) {
  ReactDOM.render(<Main />, document.getElementById('root'));
}
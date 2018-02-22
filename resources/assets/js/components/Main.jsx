import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Index from './protected/home/Index';
import Login from './public/auth/Login';
import Register from './public/auth/Register';

const PrivateRoute = ({ component: Component, logout, isAuthenticated, isReady, token, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isReady ?
        isAuthenticated
          ? (
            <Component {...props} {...rest} logout={logout} token={token} isAuthenticated={isAuthenticated} isReady={isReady} user={user} />
          )
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        : false
    }
  />
);

/* A Main React component */
class Main extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      token: null,
      user: null,
      isReady: false
    };
    this.authenticate = this.authenticate.bind(this);
    this.refresh = this.refresh.bind(this);
    this.logout = this.logout.bind(this);

    // Interceptor for expired token
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        this.refresh();
      }
      return Promise.reject(error);
    });

    // Interceptor to make request with token if possible
    axios.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      return config;
    });
  }

  componentWillMount() {
    if (this.token) {
      this.authenticate(this.token);
    }
  }

  authenticate(token) {
    axios.get('api/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
		.then((response) => {
      const { data } = response.data;
      const { id } = data;
      const user = { id, ...data.attributes };
      this.setState({
        user,
        isAuthenticated: true,
        token,
        isReady: true
      });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', token);
		})
		.catch((error) => {
      this.setState({
        isReady: true
      });
			console.log('Error!', error);
    });
  }

  logout() {
    this.setState({
      isAuthenticated: false,
      token: null,
      user: null
    });
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  refresh() {
		return axios.get('api/refreshToken')
		.then((response) => {
			const token = response.data.token;
			this.authenticate(token);
		})
		.catch((error) => {
      this.logout();
			console.log('Error!', error);
		});
  }
  
  get token() {
    return localStorage.getItem('jwt');
  }
  
  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
          <Route path='/register' render={(props) => <Register authenticate={this.authenticate} isAuthenticated={this.state.isAuthenticated} {...props} />} />
          <PrivateRoute
            path="/"
            exact
            component={Index}
            logout={this.logout}
            isAuthenticated={this.state.isAuthenticated}
            isReady={this.state.isReady}
            token={this.state.token}
            user={this.state.user} />
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
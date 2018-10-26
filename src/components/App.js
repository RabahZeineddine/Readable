import React, { Component } from 'react'
import Header from './Header'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer'
import CategoriesPostsWrapper from './CategoriesPostsWrapper';
import PrivateRoute from './PrivateRoute'

class App extends Component {

  render() {
    return (
      <div className="body">
        <div>
          <Header />
          <Switch>
            <PrivateRoute path="/login" component={Login} />
            <PrivateRoute path="/signup" component={Signup} />
            <Route exact path="/:category?/:id?" component={CategoriesPostsWrapper} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}


export default withRouter(App)
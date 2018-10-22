import React, { Component } from 'react'
import Header from './Header'
import Categories from './Categories'
import Posts from './Posts'
import Grid from '@material-ui/core/Grid'
import './App.css'
import { Route } from 'react-router-dom'
import PostDetails from './Posts/PostDetails'

class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <Route exact path="/:category?" render={({ history, match }) => (
          <Grid container spacing={8}>
            <Categories category={match.params.category} />
            <Posts category={match.params.category} navigate={() => history.push('/')} />
          </Grid>
        )
        } />
        <Route exact path="/posts/:id" render={({ match, history }) => (
          < Grid container spacing={8}>
            <PostDetails id={match.params.id} navigate={() => history.push('/')} />
          </Grid>
        )} />
      </div>
    );
  }
}

export default App
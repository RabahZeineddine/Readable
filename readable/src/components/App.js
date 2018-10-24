import React, { Component } from 'react'
import Header from './Header'
import Categories from './Categories'
import Posts from './Posts'
import Grid from '@material-ui/core/Grid'
import NotFound from './NotFound'
import './App.css'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import PostDetails from './Posts/PostDetails'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/categoriesActions'

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  checkCategory = (category) => {
    return category ? this.props.categories.items.filter(cat => cat.name.toLowerCase() == category.toLowerCase()).length > 0 : true
  }

  render() {

    const { categories } = this.props

    return (
      <div>
        <Header />
        <Route exact path="/:category?/:id?" render={({ history, match }) => {
          if (!categories.isFetching && categories.items.length > 0 && this.checkCategory(match.params.category)) {
            if (!match.params.id) {
              return (
                <Grid container spacing={8}>
                  <Categories category={match.params.category} />
                  <Posts category={match.params.category} navigate={() => history.push('/')} />
                </Grid>
              )
            } else {
              return (
                < Grid container spacing={8}>
                  <PostDetails id={match.params.id} navigate={() => history.push('/')} />
                </Grid>)
            }
          }
          else if (categories.isFetching) {
            return (
              'Loading'
            )
          } else {
            return (<NotFound />)
          }
        }
        } />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
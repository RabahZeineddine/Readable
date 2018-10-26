import React, { Component } from 'react'
import { fetchCategories } from '../../actions/categoriesActions'
import { connect } from 'react-redux'
import NotFound from '../NotFound'
import { Grid } from '@material-ui/core'
import Categories from '../Categories'
import Posts from '../Posts'
import PostDetails from '../Posts/PostDetails'



class CategoriesPostsWrapper extends Component {

    componentDidMount() {
        this.props.fetchCategories()
    }

    checkCategory = (category) => {
        return category ? this.props.categories.items.filter(cat => cat.name.toLowerCase() === category.toLowerCase()).length > 0 : true
    }

    render() {
        const { categories } = this.props
        const category = this.props.match.params.category
        const postId = this.props.match.params.id
        return (
            categories.isFetching ? `Loading...`
                : categories.items.length > 0 && this.checkCategory(category) ?
                    !postId ?
                        <Grid container spacing={8}>
                            <Categories category={category} />
                            <Posts category={category} navigate={() => this.props.history.push('/')} />
                        </Grid>
                        :
                        < Grid container spacing={8}>
                            <PostDetails id={postId} navigate={() => this.props.history.push('/')} />
                        </Grid>
                    : <NotFound />
        )
    }
}

const mapStateToProps = ({ categories }) => {
    return {
        categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPostsWrapper)
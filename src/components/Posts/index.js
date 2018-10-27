import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchPostsByCategory } from '../../actions/postsActions'
import {
    Grid,
    CircularProgress
} from '@material-ui/core'
import PostCover from './PostCover'
import './Posts.css'
import PostControl from './PostControl';

class Posts extends Component {

    state = {
        currentCategory: ''
    }

    componentDidMount() {
        if (this.props.category !== undefined && this.props.category !== this.state.currentCategory) {
            this.setState({ currentCategory: this.props.category })
            this.props.fetchPostsByCategory(this.props.category)
        } else if (this.props.category === undefined) {
            this.setState({ currentCategory: '' })
            this.props.fetchPosts()
        }
    }

    componentDidUpdate() {
        if (this.props.category !== undefined && this.props.category !== this.state.currentCategory) {
            this.setState({ currentCategory: this.props.category })
            this.props.fetchPostsByCategory(this.props.category)
        } else if (this.props.category === undefined && this.state.currentCategory !== '') {
            this.setState({ currentCategory: '' })
            this.props.fetchPosts()
        }
    }


    render() {
        const { posts } = this.props
        return (
            <Grid item container xs={12} justify="center" >
                <Grid item xs={12}>
                    <PostControl />
                </Grid>

                {posts && posts.isFetching && (
                    <div className="loading-holder">
                        <CircularProgress size={50} />
                    </div>
                )}

                {posts && !posts.isFetching && posts.items.map(post => (
                    <PostCover key={post.id} id={post.id} showDetails={false} onDelete={this.props.navigate} />
                ))}
            </Grid>

        )
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        posts: {
            ...posts,
            items: Object.keys(posts.items).reduce((acc, curr) => {
                acc.push(posts.items[curr])
                return acc
            }, [])
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Posts);
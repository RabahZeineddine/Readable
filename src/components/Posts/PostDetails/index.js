import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPostById
} from '../../../actions/postsActions'

import {
    Grid
} from '@material-ui/core'
import PostCover from '../PostCover'
import Comments from '../../Comments';

class PostDetails extends Component {


    static propTypes = {
        id: PropTypes.string.isRequired,
        navigate: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (this.props.id)
            this.props.fetchPostById(this.props.id)
    }

    render() {
        return (
            <Grid container spacing={8} justify="center">
                <PostCover id={this.props.id} showDetails={true} onDelete={this.props.navigate} />
                <Comments postId={this.props.id} />
            </Grid>
        )
    }
}

const mapStateToProps = ({ posts }, { id }) => {
    return {
        post: posts.items[id]
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPostById: post_id => dispatch(fetchPostById(post_id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
    (PostDetails)
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import { connect } from 'react-redux'
import CommentModal from './CommentModal'
import { fetchCommentsByPostId } from '../../actions/commentsActions'
import './Comments.css'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button
} from '@material-ui/core'



class Comments extends Component {

    state = {
        openNewCommentModal: false
    }


    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.fetchCommentsByPostId(this.props.postId)
    }


    closeModal = () => {
        this.setState({ openNewCommentModal: false })
    }

    openModal = () => {
        this.setState({ openNewCommentModal: true })
    }

    render() {

        const { comments } = this.props
        return (
            <Grid item xs={8}>
                <Card className="card">
                    <CardContent>
                        <div className="comments-header">
                            <Typography variant="subheading" component="h4" >{comments && comments.length > 0 ? `Comments` : `No comments yet`}</Typography>
                            {this.props.user && this.props.user.isLogged && (
                                <Button variant="contained" color="primary" onClick={this.openModal}>New Comment</Button>
                            )}
                        </div>
                        {comments && comments.length > 0 && (
                            comments.map((comment) => (
                                <Comment key={comment.id} id={comment.id} />
                            ))
                        )}
                    </CardContent>
                </Card>

                {this.state.openNewCommentModal && (
                    <CommentModal parentId={this.props.postId} open={this.state.openNewCommentModal} closeModal={this.closeModal} />
                )}
            </Grid>
        )
    }
}

const mapStateToProps = ({ comments, user }) => {
    return {
        comments: Object.keys(comments.items).reduce((acc, curr) => {
            acc.push(comments.items[curr])
            return acc
        }, []),
        user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCommentsByPostId: postId => dispatch(fetchCommentsByPostId(postId))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)
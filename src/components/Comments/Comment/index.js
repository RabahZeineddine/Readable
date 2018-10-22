import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import CommentDeleteModal from './CommentDeleteModal'
import CommentModal from '../CommentModal'
import { commentUpVote, commentDownVote } from '../../../actions/commentsActions'
import { Card, CardContent, Typography, Icon, CardActions } from '@material-ui/core';
import './Comment.css'

class Comment extends Component {

    state = {
        openDeleteModal: false,
        openEditModal: false
    }

    static propTypes = {
        id: PropTypes.string.isRequired
    }

    openDeleteModal = () => {
        this.setState({ openDeleteModal: true })
    }

    closeDeleteModal = () => {
        this.setState({ openDeleteModal: false })
    }

    openEditModal = () => {
        this.setState({ openEditModal: true })
    }

    closeEditModal = () => {
        this.setState({ openEditModal: false })
    }

    render() {

        const { comment, commentDownVote, commentUpVote } = this.props

        return (
            <div>

                <Card className="card">
                    <CardContent>
                        <div className="comment-header">
                            <Typography>{`${comment.author} commented:`}</Typography>
                            <div>
                                <Icon onClick={this.openEditModal} className={`icon`} color="primary" >edit</Icon>
                                <Icon onClick={this.openDeleteModal} className={`icon`} color="secondary" >delete</Icon>
                            </div>
                        </div>
                        <br />
                        <div className="comment-body">
                            <div className="comment-vote">
                                <Icon className="thumbs-icon" onClick={() => commentUpVote(comment.id)}>thumb_up</Icon>
                                <Typography className="voting-number">{comment.voteScore}</Typography>
                                <Icon className="thumbs-icon" onClick={() => commentDownVote(comment.id)} >thumb_down</Icon>
                            </div>
                            <div className="comment-body-content">
                                <Typography>{comment.body}</Typography>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions className="comment-card-action">
                        <Typography align="right" variant="caption">
                            <Moment date={comment.timestamp} format="DD/MM/YYYY HH:mm" />
                        </Typography>
                    </CardActions>
                </Card>
                {this.state.openDeleteModal && (
                    <CommentDeleteModal open={this.state.openDeleteModal} closeModal={this.closeDeleteModal} comment={comment} />
                )}
                {this.state.openEditModal && (
                    <CommentModal open={this.state.openEditModal} closeModal={this.closeEditModal} comment={comment} />
                )}
            </div>
        )
    }

}

const mapStateToProps = (({ comments }, { id }) => {
    return {
        comment: comments.items[id] || null
    }
})

const mapDispatchToProps = dispatch => {
    return {
        commentUpVote: (comment_id) => dispatch(commentUpVote(comment_id)),
        commentDownVote: (comment_id) => dispatch(commentDownVote(comment_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
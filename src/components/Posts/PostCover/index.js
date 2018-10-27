import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon';
import Moment from 'react-moment'
import PostDeleteModal from '../PostDeleteModal'
import PostModal from '../PostModal'
import { postUpVote, postDownVote } from '../../../actions/postsActions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './PostCover.css'

class PostCover extends Component {


    state = {
        openDeleteModal: false,
        openEditModal: false
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        showDetails: PropTypes.bool.isRequired
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
        const { post, postUpVote, postDownVote, showDetails, user } = this.props
        return (
            post ?
                <Grid item xs={8}>
                    <Card className="card post-cover">
                        <CardContent>
                            <div className="post-header">
                                <Typography variant="headline" component="h2">
                                    <Link to={`/${post.category}/${post.id}`} className="post-link">
                                        {post.title}
                                    </Link>
                                </Typography>
                                {user && user.isLogged && user.info.firstname.toLowerCase() === post.author.toLowerCase() && (
                                    <div>
                                        <Icon onClick={this.openEditModal} className={`icon`} color="primary" >edit</Icon>
                                        <Icon onClick={this.openDeleteModal} className={`icon`} color="secondary" >delete</Icon>
                                    </div>
                                )}
                            </div>
                            <br />
                            {showDetails ?
                                <div>
                                    {post.body}
                                    <br /><br />
                                </div>
                                : ''}
                            <div className="comments-count">
                                <Icon className="comment-icon">comment</Icon>
                                <Typography className="comments-count-details">{(post.commentCount > 1) ? ` ${post.commentCount} Comments` : (post.commentCount === 1) ? ` 1 Comment` : ` No comments yet`}</Typography>
                            </div>

                            <br />
                            <div className="post-voting">
                                <Icon className="thumbs-icon" onClick={() => postUpVote(post.id)}>thumb_up</Icon>
                                <Typography className="voting-number">{post.voteScore}</Typography>
                                <Icon className="thumbs-icon" onClick={() => postDownVote(post.id)} >thumb_down</Icon>
                            </div>
                        </CardContent>
                        <CardActions className="post-cover-card-action">
                            <Typography align='left'>
                                Posted by: {post.author}
                            </Typography>
                            <Typography align='right' variant="caption">
                                <Moment date={post.timestamp} format="DD/MM/YYYY HH:mm" />
                            </Typography>
                        </CardActions>
                    </Card>
                    {this.state.openDeleteModal && (
                        <PostDeleteModal open={this.state.openDeleteModal} closeModal={this.closeDeleteModal} post={post} onDelete={this.props.onDelete} />
                    )}
                    {this.state.openEditModal && (
                        <PostModal open={this.state.openEditModal} closeModal={this.closeEditModal} post={post} />
                    )}
                </Grid>
                : ''
        )
    }
}

const mapStateToProps = ({ posts, user }, ownProps) => {
    return {
        post: posts.items[ownProps.id] || null,
        user,
        posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postDownVote: (post_id) => dispatch(postDownVote(post_id)),
        postUpVote: (post_id) => dispatch(postUpVote(post_id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(PostCover)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostModal from '../PostModal'
import { orderPostsByDate, orderPostsByVote, fetchPosts } from '../../../actions/postsActions'
import {
    CardContent,
    Card,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button
} from '@material-ui/core';


class PostControl extends Component {

    state = {
        openModal: false
    }

    handleSelectChange = event => {
        const order = event.target.value
        switch (order) {
            case "voteScore":
                this.props.orderPostsByVote()
                break;
            case "date":
                this.props.orderPostsByDate()
                break;
        }
    }

    closeModal = () => {
        this.setState({ openModal: false })
    }

    openModal = () => {
        this.setState({ openModal: true })
    }

    render() {
        return (
            <Card>
                <Card>
                    <CardContent className="posts-control-card">
                        <div className="order-post-control">
                            <Typography variant="subheading" color="textSecondary">
                                Order posts by:
                            </Typography>
                            <FormControl className="formControl formControl-holder">
                                <Select
                                    value={this.props.posts.orderBy || 'voteScore'}
                                    displayEmpty
                                    onChange={this.handleSelectChange}
                                    name="postsControl"
                                >
                                    <MenuItem value="voteScore">Vote score</MenuItem>
                                    <MenuItem value="date">Date</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" onClick={this.openModal}>
                                New Post
                                </Button>
                            <PostModal open={this.state.openModal} closeModal={this.closeModal} />
                        </div>
                    </CardContent>
                </Card>
            </Card>
        )
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderPostsByDate: () => dispatch(orderPostsByDate()),
        orderPostsByVote: () => dispatch(orderPostsByVote()),
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostControl)
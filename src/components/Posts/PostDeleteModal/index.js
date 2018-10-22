import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost } from '../../../actions/postsActions'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core'

class PostDeleteModal extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired
    }

    deletePost = () => {
        const { post } = this.props
        this.props.deletePost(post.id)
        this.props.onDelete()
    }

    render() {

        const post = this.props.post

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to remove the post: <b>{post.title}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="primary">
                        Cancel
              </Button>
                    <Button onClick={this.deletePost} color="secondary" autoFocus>
                        Delete
              </Button>
                </DialogActions>
            </Dialog>
        )
    }

}



const mapDispatchToProps = dispatch => {
    return {
        deletePost: (post_id) => dispatch(deletePost(post_id))
    }
}

export default connect(null, mapDispatchToProps)(PostDeleteModal)
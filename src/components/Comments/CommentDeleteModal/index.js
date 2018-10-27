import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../../actions/commentsActions'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core'

class CommentDeleteModal extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        comment: PropTypes.object.isRequired
    }

    deleteComment = () => {
        const { comment } = this.props
        this.props.deleteComment(comment.id)
    }

    render() {

        const comment = this.props.comment

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
                        Are you sure that you want to remove the comment: <b>{comment.body}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeModal} color="primary">
                        Cancel
              </Button>
                    <Button onClick={this.deleteComment} color="secondary" autoFocus>
                        Delete
              </Button>
                </DialogActions>
            </Dialog>
        )
    }

}



const mapDispatchToProps = dispatch => {
    return {
        deleteComment: (comment_id) => dispatch(deleteComment(comment_id))
    }
}

export default connect(null, mapDispatchToProps)(CommentDeleteModal)
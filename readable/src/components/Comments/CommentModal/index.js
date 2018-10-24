import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    addComment,
    editComment
} from '../../../actions/commentsActions'

import UUID from 'uuid/v1'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Grid,
    Slide
} from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CommentModal extends Component {


    state = {
        comment: {
            content: '',
            author: '',
        },
        editModal: false
    }

    static propTypes = {
        open: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        parentId: PropTypes.string,
        comment: PropTypes.object
    }


    handleInputChange = key => event => {
        const value = event.target.value
        this.setState((prevState) => ({
            comment: {
                ...prevState.comment,
                [key]: value
            }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.editModal) {
            let comment = Object.assign({}, this.props.comment, this.state.comment)
            comment.timestamp = new Date().getTime()
            this.props.editComment(comment).then(() => {
                this.props.closeModal()
            })
        } else {
            let { comment } = this.state
            comment.id = UUID()
            comment.timestamp = Date.now()
            comment.parentId = this.props.parentId
            this.props.addComment(comment).then(() => {
                this.props.closeModal()
            })
        }
    }

    closeModal = () => {
        this.props.closeModal()
    }

    componentDidMount() {
        if (this.props.comment) {
            this.setState({ editModal: true, comment: this.props.comment })
        }
    }

    render() {
        const comment = this.state.comment

        return (
            <Dialog
                open={this.props.open}
                onClose={this.closeModal}
                aria-labelledby="new-post-dialog"
                className="new-post-dialog"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle id="new-post-dialog" >New Comment</DialogTitle>
                <form onSubmit={this.handleSubmit}>

                    <DialogContent>
                        <DialogContentText className="new-post-dialog">
                            To add a new comment, please fill the inputs below.
                    </DialogContentText>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <TextField
                                    id="body"
                                    label="Content"
                                    value={comment.body}
                                    onChange={this.handleInputChange('body')}
                                    multiline
                                    rowsMax="4"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="author"
                                    value={comment.author}
                                    onChange={this.handleInputChange('author')}
                                    label="Author"
                                    type="text"
                                    fullWidth={true}
                                    required
                                />
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit">
                            {this.state.editModal ? `Edit` : `Comment`}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addComment: (comment) => dispatch(addComment(comment)),
        editComment: (comment) => dispatch(editComment(comment))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(CommentModal)
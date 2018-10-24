import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    addPost,
    editPost
} from '../../../actions/postsActions'

import {
    fetchCategories
} from '../../../actions/categoriesActions'

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
    Slide,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class PostModal extends Component {


    state = {
        post: {
            title: '',
            author: '',
            content: '',
            category: ''
        },
        editModal: false
    }

    static propTypes = {
        open: PropTypes.bool.isRequired,
        closeModal: PropTypes.func.isRequired,
        post: PropTypes.object
    }


    handleInputChange = key => event => {
        const value = event.target.value
        this.setState((prevState) => ({
            post: {
                ...prevState.post,
                [key]: value
            }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.category != 'default') {

            if (this.state.editModal) {
                let post = Object.assign({}, this.props.post, this.state.post)
                this.props.editPost(post).then(() => {
                    this.props.closeModal()
                })
            } else {
                let { post } = this.state
                post.id = UUID()
                post.timestamp = Date.now()
                this.props.addPost(post).then(() => {
                    this.props.closeModal()
                })
            }
        } else {
            // show error message later
        }
    }

    closeModal = () => {
        this.props.closeModal()
    }

    componentDidMount() {
        if (this.props.post) {
            this.setState({ editModal: true, post: this.props.post })
        }

        if (this.props.categories.items.length == 0 ) this.props.fetchCategories()
    }

    render() {
        const { categories } = this.props
        const post = this.state.post

        return (
            <Dialog
                open={this.props.open}
                onClose={this.closeModal}
                aria-labelledby="new-post-dialog"
                className="new-post-dialog"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle id="new-post-dialog" >New Post</DialogTitle>
                <form onSubmit={this.handleSubmit}>

                    <DialogContent>
                        <DialogContentText className="new-post-dialog">
                            To create a new post, please fill the inputs below.
                    </DialogContentText>

                        <Grid container spacing={24}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="title"
                                    label="Title"
                                    value={post.title}
                                    onChange={this.handleInputChange('title')}
                                    type="text"
                                    fullWidth={true}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="body"
                                    label="Content"
                                    value={post.body}
                                    onChange={this.handleInputChange('body')}
                                    multiline
                                    rowsMax="4"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl className="formControl full-width">
                                    <InputLabel htmlFor="post-category">Category</InputLabel>
                                    <Select
                                        value={post.category}
                                        name="catergory"
                                        onChange={this.handleInputChange('category')}
                                        inputProps={{
                                            name: 'postCategory',
                                            id: 'post-category'
                                        }}
                                        required
                                    >
                                        <MenuItem value="" disabled selected>Choose a category</MenuItem>
                                        {categories && categories.items && (
                                            categories.items.map((category) => <MenuItem value={category.name} key={category.name} >{category.name}</MenuItem>)
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="author"
                                    value={post.author}
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
                            {this.state.editModal ? `Edit` : `Create`}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
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
        addPost: (post) => dispatch(addPost(post)),
        editPost: (post) => dispatch(editPost(post)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostModal)
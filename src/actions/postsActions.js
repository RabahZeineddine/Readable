import * as PostsAPI from '../utils/postsAPI'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST'
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE'
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS'
export const ORDER_POST_BY_DATE = 'ORDER_POST_BY_DATE'
export const ORDER_POST_BY_VOTE = 'ORDER_POST_BY_VOTE'
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCESS'
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST'
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE'
export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'


const UP_VOTE = 'upVote'
const DOWN_VOTE = 'downVote'

const fetchPostsRequest = () => {
    return {
        type: FETCH_POSTS_REQUEST
    }
}

const fetchPostsFailure = (error) => {
    return {
        type: FETCH_POSTS_FAILURE,
        error
    }
}

const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        response: posts
    }
}

export const fetchPosts = () => dispatch => {
    dispatch(fetchPostsRequest())
    return PostsAPI
        .fetchPosts()
        .then(posts => dispatch(fetchPostsSuccess(posts)))
        .catch(err => dispatch(fetchPostsFailure(err)))
}

export const fetchPostsByCategory = (category) => dispatch => {
    dispatch(fetchPostsRequest())
    return PostsAPI
        .fetchPostsByCategory(category)
        .then(posts => dispatch(fetchPostsSuccess(posts)))
        .catch(err => dispatch(fetchPostsFailure(err)))
}

const votePostRequest = (post_id) => {
    return {
        type: VOTE_POST_REQUEST,
        post_id
    }
}

const votePostFailure = ({ error, post_id }) => {
    return {
        type: VOTE_POST_FAILURE,
        error,
        post_id
    }
}

const votePostSuccess = (response) => {
    return {
        type: VOTE_POST_SUCCESS,
        response
    }
}


export const postUpVote = (post_id) => {
    return postVote(post_id, UP_VOTE)
}

export const postDownVote = (post_id) => {
    return postVote(post_id, DOWN_VOTE)
}

const postVote = (post_id, vote_option) => dispatch => {
    dispatch(votePostRequest(post_id))
    return PostsAPI
        .postVote(post_id, vote_option)
        .then(newPost => dispatch(votePostSuccess(newPost)))
        .then(() => dispatch(orderPostsByVote()))
        .catch(err => dispatch(votePostFailure({ err, post_id })))
}

export const orderPostsByDate = () => {
    return {
        type: ORDER_POST_BY_DATE
    }
}

export const orderPostsByVote = () => {
    return {
        type: ORDER_POST_BY_VOTE
    }
}

const addNewPostRequest = () => {
    return {
        type: ADD_POST_REQUEST
    }
}

const addNewPostSucess = (post) => {
    return {
        type: ADD_POST_SUCCESS,
        post
    }
}

const addNewPostFailure = (error) => {
    return {
        type: ADD_POST_FAILURE,
        error
    }
}

export const addPost = (post) => dispatch => {
    dispatch(addNewPostRequest())
    return PostsAPI
        .createPost(post)
        .then(newPost => dispatch(addNewPostSucess(newPost)))
        .then(() => dispatch(orderPostsByVote()))
        .catch(err => dispatch(addNewPostFailure(err)))
}


const deletePostRequest = () => {
    return {
        type: DELETE_POST_REQUEST
    }
}

const deletePostFailure = (error) => {
    return {
        type: DELETE_POST_FAILURE,
        error
    }
}

const deletePostSuccess = (post_id) => {
    return {
        type: DELETE_POST_SUCCESS,
        post_id
    }
}

export const deletePost = (post_id) => dispatch => {
    dispatch(deletePostRequest())
    return PostsAPI
        .deletePost(post_id)
        .then(() => dispatch(deletePostSuccess(post_id)))
        .catch(err => dispatch(deletePostFailure(err)))
}

const editPostRequest = () => {
    return {
        type: EDIT_POST_REQUEST
    }
}

const editPostSuccess = (editedPost) => {
    return {
        type: EDIT_POST_SUCCESS,
        post: editedPost
    }
}

const editPostFailure = (error) => {
    return {
        type: EDIT_POST_FAILURE,
        error
    }
}

export const editPost = (post) => dispatch => {
    dispatch(editPostRequest())
    return PostsAPI
        .editPost(post)
        .then((editedPost) => dispatch(editPostSuccess(editedPost)))
        .catch(err => dispatch(editPostFailure(err)))
}

const fetchPostRequest = () => {
    return {
        type: FETCH_POST_REQUEST
    }
}

const fetchPostSuccess = (post) => {
    return {
        type: FETCH_POST_SUCCESS,
        post
    }
}

const fetchPostFailure = (error) => {
    return {
        type: FETCH_POST_FAILURE,
        error
    }
}

export const fetchPostById = (post_id) => dispatch => {
    dispatch(fetchPostRequest())
    return PostsAPI
        .fetchPostById(post_id)
        .then((post) => {
            if (!post.error) {
                return dispatch(fetchPostSuccess(post))
            } else {
                return dispatch(fetchPostFailure(post))
            }
        })
        .catch(err => dispatch(fetchPostFailure(err)))
}
import * as CommentsAPI from '../utils/commentsAPI'

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE'
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE'
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'
export const ORDER_COMMENTS_BY_VOTE = 'ORDER_COMMENTS_BY_VOTE'
export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST'
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE'
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS'
export const VOTE_COMMENT_REQUEST = 'VOTE_COMMENT_REQUEST'
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE'
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS'

const UP_VOTE = 'upVote'
const DOWN_VOTE = 'downVote'


const fetchCommentsRequest = () => {
    return {
        type: FETCH_COMMENTS_REQUEST
    }
}

const fetchCommentsSuccess = (comments) => {
    return {
        type: FETCH_COMMENTS_SUCCESS,
        comments
    }
}

const fetchCommentsFailure = (error) => {
    return {
        type: FETCH_COMMENTS_FAILURE,
        error
    }
}

export const fetchCommentsByPostId = (postId) => dispatch => {
    dispatch(fetchCommentsRequest())
    return CommentsAPI
        .fetchCommentsByPostId(postId)
        .then(comments => dispatch(fetchCommentsSuccess(comments)))
        .catch(err => dispatch(fetchCommentsFailure(err)))
}

const deleteCommentRequest = () => {
    return {
        type: DELETE_COMMENT_REQUEST
    }
}

const deleteCommentFailure = (error) => {
    return {
        type: DELETE_COMMENT_FAILURE,
        error
    }
}

const deleteCommentSuccess = (deletedComment) => {
    return {
        type: DELETE_COMMENT_SUCCESS,
        deletedComment
    }
}

export const deleteComment = (commentId) => dispatch => {
    dispatch(deleteCommentRequest())
    return CommentsAPI
        .deleteComment(commentId)
        .then((deletedComment) => dispatch(deleteCommentSuccess(deletedComment)))
        .catch(err => dispatch(deleteCommentFailure(err)))
}


const addCommentRequest = () => {
    return {
        type: ADD_COMMENT_REQUEST
    }
}

const addCommentFailure = (error) => {
    return {
        type: ADD_COMMENT_FAILURE,
        error
    }
}

const addCommentSuccess = (addedComment) => {
    return {
        type: ADD_COMMENT_SUCCESS,
        addedComment
    }
}

export const orderCommentsByVote = () => {
    return {
        type: ORDER_COMMENTS_BY_VOTE
    }
}



export const addComment = (comment) => dispatch => {
    dispatch(addCommentRequest())
    return CommentsAPI
        .addComment(comment)
        .then(newComment => dispatch(addCommentSuccess(newComment)))
        .then(() => dispatch(orderCommentsByVote()))
        .catch(err => dispatch(addCommentFailure(err)))
}


const editCommentRequest = () => {
    return {
        type: EDIT_COMMENT_REQUEST
    }
}

const editCommentSuccess = (comment) => {
    return {
        type: EDIT_COMMENT_SUCCESS,
        comment
    }
}

const editCommentFailure = (error) => {
    return {
        type: EDIT_COMMENT_FAILURE,
        error
    }
}

export const editComment = (comment) => dispatch => {
    dispatch(editCommentRequest())
    return CommentsAPI
        .editComment(comment)
        .then((editedComment) => dispatch(editCommentSuccess(editedComment)))
        .catch(err => dispatch(editCommentFailure(err)))
}

const voteCommentRequest = (comment_id) => {
    return {
        type: VOTE_COMMENT_REQUEST,
        comment_id
    }
}

const voteCommentFailure = ({ error, comment_id }) => {
    return {
        type: VOTE_COMMENT_FAILURE,
        error,
        comment_id
    }
}

const voteCommentSuccess = (comment) => {
    return {
        type: VOTE_COMMENT_SUCCESS,
        comment
    }
}

export const commentUpVote = (comment_id) => {
    return commentVote(comment_id, UP_VOTE)
}

export const commentDownVote = (comment_id) => {
    return commentVote(comment_id, DOWN_VOTE)
}

const commentVote = (comment_id, vote_option) => dispatch => {
    dispatch(voteCommentRequest(comment_id))
    return CommentsAPI
        .commentVote(comment_id, vote_option)
        .then(newComment => dispatch(voteCommentSuccess(newComment)))
        .then(() => dispatch(orderCommentsByVote()))
        .catch(error => dispatch(voteCommentFailure({ error, comment_id })))
}
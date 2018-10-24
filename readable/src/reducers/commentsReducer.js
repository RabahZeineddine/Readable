import {
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ORDER_COMMENTS_BY_VOTE,
    EDIT_COMMENT_FAILURE,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS,
    VOTE_COMMENT_FAILURE,
    VOTE_COMMENT_REQUEST,
    VOTE_COMMENT_SUCCESS
} from '../actions/commentsActions'

const initialCommentsState = {
    isFetching: false,
    lastUpdate: 0,
    items: {}
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_COMMENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastUpdate: new Date().getTime(),
                orderBy: 'voteScore',
                items: action.comments.sort((a, b) => a.voteScore < b.voteScore).reduce((acc, curr) => {
                    if (!curr.parentDeleted)
                        acc[curr['id']] = curr
                    return acc
                }, {})
            }
        case DELETE_COMMENT_REQUEST:
            return {
                ...state,
                isDeleting: true,
                deletingError: false
            }
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isDeleting: false,
                deletingError: false,
                items: Object.keys(state['items']).reduce((acc, curr) => {
                    if (curr !== action.commentId) acc[curr] = state['items'][curr]
                    return acc
                }, {})
            }
        case DELETE_COMMENT_FAILURE:
            return {
                ...state,
                isDeleting: false,
                deletingError: true
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addingComment: true,
                addingCommentError: false
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                lastUpdate: new Date().getTime(),
                addingComment: false,
                addingCommentError: false,
                items: {
                    ...state['items'],
                    [action.comment.id]: action.comment
                }
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addingComment: false,
                addingCommentError: true
            }
        case ORDER_COMMENTS_BY_VOTE:
            return {
                ...state,
                orderBy: 'voteScore',
                items: Object.keys(state['items']).sort((a, b) => state['items'][a].voteScore < state['items'][b].voteScore).reduce((acc, curr) => {
                    acc[curr] = state['items'][curr]
                    return acc
                }, {})
            }

        case EDIT_COMMENT_REQUEST:
            return {
                ...state,
                isEditing: true,
                editingError: false
            }
        case EDIT_COMMENT_FAILURE:
            return {
                ...state,
                isEditing: false,
                editingError: true
            }
        case EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                isEditing: false,
                editingError: false,
                items: {
                    ...state['items'],
                    [action.comment.id]: action.comment
                }
            }

        case VOTE_COMMENT_REQUEST:
            return {
                ...state,
                items: {
                    ...state['items'],
                    [action.comment_id]: {
                        ...state['items'][action.comment_id],
                        isFetching: true
                    }
                }
            }

        case VOTE_COMMENT_SUCCESS:
            return {
                ...state,
                lastUpdate: new Date().getTime(),
                items: {
                    ...state['items'],
                    [action.comment.id]: {
                        ...action.comment,
                        isFetching: false
                    }
                }
            }

        case VOTE_COMMENT_FAILURE:
            return {
                ...state,
                items: {
                    ...state['items'],
                    [action.comment_id]: {
                        ...state['items'][action.comment_id],
                        isFetching: false
                    }
                }
            }

        default:
            return state
    }
}

export default comments
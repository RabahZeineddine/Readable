import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    VOTE_POST_FAILURE,
    VOTE_POST_SUCCESS,
    VOTE_POST_REQUEST,
    ORDER_POST_BY_DATE,
    ORDER_POST_BY_VOTE,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    EDIT_POST_FAILURE,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    FETCH_POST_REQUEST,
    FETCH_POST_FAILURE,
    FETCH_POST_SUCCESS
} from '../actions/postsActions'

const initialPostsState = {
    isFetching: false,
    lastUpdated: 0,
    items: {}
}

function posts(state = initialPostsState, action) {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime(),
                orderBy: "voteScore",
                items: action.response.sort((a, b) => a.voteScore < b.voteScore).reduce((acc, curr) => {
                    acc[curr['id']] = curr
                    return acc
                }, {})
            }
        case VOTE_POST_REQUEST:
            return {
                ...state,
                items: {
                    ...state['items'],
                    [action.post_id]: {
                        ...state['items'][action.post_id],
                        isFetching: true
                    }
                }
            }
        case VOTE_POST_SUCCESS:
            return {
                ...state,
                lastUpdated: new Date().getTime(),
                items: {
                    ...state['items'],
                    [action.response.id]: {
                        ...action.response,
                        isFetching: false
                    }
                }
            }
        case VOTE_POST_FAILURE:
            return {
                ...state,
                items: {
                    ...state['items'],
                    [action.post_id]: {
                        ...state['items'][action.post_id],
                        isFetching: false
                    }
                }
            }

        case ORDER_POST_BY_DATE:
            return {
                ...state,
                orderBy: "date",
                items: Object.keys(state['items'])
                    .sort((a, b) => state['items'][a].timestamp < state['items'][b].timestamp)
                    .reduce((acc, curr) => {
                        acc[curr] = state['items'][curr]
                        return acc
                    }, {})

            }
        case ORDER_POST_BY_VOTE: {
            return {
                ...state,
                orderBy: "voteScore",
                items: Object.keys(state['items'])
                    .sort((a, b) => state['items'][a].voteScore < state['items'][b].voteScore)
                    .reduce((acc, curr) => {
                        acc[curr] = state['items'][curr]
                        return acc
                    }, {})
            }
        }

        case ADD_POST_REQUEST: {
            return {
                ...state,
                addingPost: true,
                addingPostError: false
            }
        }

        case ADD_POST_SUCCESS: {
            return {
                ...state,
                addingPost: false,
                addingPostError: false,
                items: {
                    ...state['items'],
                    [action.post.id]: action.post
                }
            }
        }

        case ADD_POST_FAILURE: {
            return {
                ...state,
                addingPost: false,
                addingPostError: true
            }
        }

        case DELETE_POST_REQUEST:
            return {
                ...state,
                deletingPost: true,
                deletingPostError: false
            }

        case DELETE_POST_SUCCESS:
            return {
                ...state,
                deletingPost: false,
                deletingPostError: false,
                items: Object.keys(state['items']).reduce((acc, curr) => {
                    if (curr !== action.post_id) acc[curr] = state['items'][curr]
                    return acc
                }, {})
            }

        case DELETE_POST_FAILURE:
            return {
                ...state,
                deletingPost: false,
                deletingPostError: true
            }

        case EDIT_POST_REQUEST: {
            return {
                ...state,
                editingPost: true,
                editingPostError: false
            }
        }

        case EDIT_POST_SUCCESS: {
            return {
                ...state,
                editingPost: false,
                editingPostError: false,
                items: {
                    ...state['items'],
                    [action.post.id]: action.post
                }
            }
        }

        case EDIT_POST_FAILURE: {
            return {
                ...state,
                editingPost: false,
                editingPostError: true
            }
        }

        case FETCH_POST_REQUEST: {
            return {
                ...state,
                fetchingPost: true,
                fetchingPostError: false
            }
        }

        case FETCH_POST_FAILURE: {
            return {
                ...state,
                fetchingPost: false,
                fetchingPostError: true
            }
        }

        case FETCH_POST_SUCCESS:
            return {
                ...state,
                fetchingPost: false,
                fetchingPostError: false,
                items: {
                    ...state['items'],
                    [action.post.id]: action.post
                }
            }

        default:
            return state
    }
}

export default posts

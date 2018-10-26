import { combineReducers } from 'redux'
import categories from './categoriesReducer'
import posts from './postsReducer'
import comments from './commentsReducer'
import user from './userReduce'

export default combineReducers({
    categories,
    posts,
    comments,
    user
})
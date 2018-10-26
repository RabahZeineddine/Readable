import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS
} from '../actions/categoriesActions'


const initialCategoriesState = {
    isFetching: false,
    lastUpdated: 0,
    items: []
}

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                lastUpdated: new Date().getTime(),
                items: action.response
            }
        default:
            return state
    }
}

export default categories
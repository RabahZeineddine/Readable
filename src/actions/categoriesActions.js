import * as CategoriesAPI from '../utils/categoriesAPI'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'

const fetchCategoriesRequest = () => {
    return {
        type: FETCH_CATEGORIES_REQUEST
    }
}

const fetchCategoriesFailure = (error) => {
    return {
        type: FETCH_CATEGORIES_FAILURE,
        error
    }
}

const fetchCategoriesSuccess = ({ categories }) => {
    return {
        type: FETCH_CATEGORIES_SUCCESS,
        response: categories
    }
}

export const fetchCategories = () => dispatch => {
    dispatch(fetchCategoriesRequest())
    return CategoriesAPI
        .fetchCategories()
        .then(categories => dispatch(fetchCategoriesSuccess(categories)))
        .catch(err => dispatch(fetchCategoriesFailure(err)))
}
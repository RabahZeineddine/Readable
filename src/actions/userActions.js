import * as UserAPI from '../utils/userAPI'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT'



const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

const loginSuccess = (info) => {
    return {
        type: LOGIN_SUCCESS,
        info
    }
}

const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        error
    }
}

export const login = (user) => dispatch => {
    dispatch(loginRequest())
    return UserAPI
        .login(user)
        .then(info => {
            if (!info.error) return dispatch(loginSuccess(info))
            else return dispatch(loginFailure(info.errorMsg))
        })
        .catch(err => dispatch(loginFailure(err)))
}


const signupRequest = () => {
    return {
        type: SIGNUP_REQUEST
    }
}

const signupSuccess = (info) => {
    return {
        type: SIGNUP_SUCCESS,
        info
    }
}

const signupFailure = (error) => {
    return {
        type: SIGNUP_FAILURE,
        error
    }
}

export const signup = (user) => dispatch => {
    dispatch(signupRequest())
    return UserAPI
        .signup(user)
        .then(info => {
            if (!info.error) return dispatch(signupSuccess(info))
            else return dispatch(signupFailure(info.errorMsg))
        })
}


export const logout = () => {
    return {
        type: USER_LOGOUT
    }
}

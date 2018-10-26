import { getSession, sessionCheck } from '../utils/util'

import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    USER_LOGOUT
} from '../actions/userActions'


const initialUserState = {
    isLoggingIn: false,
    isSigningUp: false,
    isLogged: sessionCheck('USER'),
    lastUpdated: 0,
    info: (sessionCheck('USER')) ? getSession('USER') : {}

}

function user(state = initialUserState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                error: null
            }
        case SIGNUP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                error: action.error
            }
        }

        case SIGNUP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                error: null,
                isLogged: true,
                info: action.info.user,
                msg: action.info.msg
            }
        }

        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
                error: null
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isLoggingIn: false,
                error: action.error
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLogged: true,
                info: action.info.user,
                msg: action.info.msg
            }
        }
        case USER_LOGOUT: {
            return {
                isLoggingIn: false,
                isSigningUp: false,
                isLogged: false,
                lastUpdated: 0,
                info: {}
            }
        }
        default:
            return state
    }
}

export default user
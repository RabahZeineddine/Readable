import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class PrivateRoute extends Component {

    auth = {
        isLogged: this.props.user.isLogged
    }

    render() {
        const { component: Comp, ...rest } = this.props

        return (
            <Route
                {...rest}
                render={props =>
                    this.auth.isLogged ?
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />
                        :
                        <Comp {...props} />
                }
            />
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(PrivateRoute)
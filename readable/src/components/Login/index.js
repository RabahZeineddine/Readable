import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { connect } from 'react-redux'
import { login } from '../../actions/userActions'
import MD5 from 'md5'
import { getServerMessage, setSession } from '../../utils/util'
import { Grid, Card, CardContent, Typography, TextField, Button } from '@material-ui/core';

class Login extends Component {

    state = {
        inputErrors: {
            emailError: false,
            passwordError: false,

        },
        user: {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let inputErrors = this.state.inputErrors
        const values = serializeForm(e.target, { hash: true })
        let valid = true


        if (!values.email) {
            inputErrors.emailError = true
            inputErrors.emailMsg = "Email is required"
            valid = false
        }

        if (!values.password) {
            inputErrors.passwordError = true
            inputErrors.passwordMsg = "Password is required"
            valid = false
        }

        if (!valid) {
            this.setState({ inputErrors })
        } else {
            /* Login */
            values.password = MD5(values.password)
            this.props.login(values).then(() => {
                if (this.props.user.msg === "USER_LOGGED_SUCCESSFULLY") {
                    setSession('USER', this.props.user.info)
                    this.props.history.push('/')
                }
            })

        }
    }

    handleInputChange = key => event => {
        const value = event.target.value
        let inputErrors = this.state.inputErrors
        if (key === "email") {
            inputErrors.emailError = false
            delete inputErrors.emailMsg
        } else if (key === "password") {
            inputErrors.passwordError = false
            delete inputErrors.passwordMsg
        }

        this.setState((prevState) => ({
            ...prevState,
            inputErrors,
            user: { ...prevState.user, [key]: value }
        }))

    }


    render() {
        const { user, inputErrors } = this.state
        return (
            <Grid container spacing={8} justify="center">
                <Grid item xs={8}>
                    <br />
                    <br />
                    <br />
                    <Card className="card">
                        <CardContent>
                            <Typography variant="title"  >Login</Typography>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <Typography className="error-alert">{this.props.user.error ? getServerMessage(this.props.user.error) : ''}</Typography>
                                <Grid container spacing={8}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={inputErrors.emailError ? true : false}
                                            helperText={inputErrors.emailMsg}
                                            value={user.email}
                                            onChange={this.handleInputChange('email')}
                                            margin="dense"
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="text"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextField
                                            error={inputErrors.passwordError ? true : false}
                                            helperText={inputErrors.passwordMsg}
                                            value={user.password}
                                            onChange={this.handleInputChange('password')}
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            fullWidth={true}
                                            type="password"
                                        />
                                    </Grid>

                                </Grid>
                                <br />
                                <Grid container spacing={8} justify="center" >
                                    <Button color="primary" variant="outlined" type="submit" >{this.props.user.isLoggingIn ? 'Loading...' : 'Login'}</Button>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

const mapDispatchToPros = dispatch => {
    return {
        login: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(Login)
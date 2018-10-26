import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signup } from '../../actions/userActions'
import MD5 from 'md5'
import { getServerMessage, setSession } from '../../utils/util'
import { Grid, Card, CardContent, Typography, TextField, Button } from '@material-ui/core';
import './signup.css'
class Signup extends Component {

    static propTypes = {
        onSignup: PropTypes.func.isRequired
    }

    state = {
        inputErrors: {
            firstnameError: false,
            lastnameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false
        },
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let inputErrors = this.state.inputErrors
        const values = serializeForm(e.target, { hash: true })
        let valid = true
        if (!values.firstname) {
            inputErrors.firstnameError = true
            inputErrors.firstnameMsg = "Firstname is required"
            valid = false
        }

        if (!values.lastname) {
            inputErrors.lastnameError = true
            inputErrors.lastnameMsg = "Lastname is required"
            valid = false
        }


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

        if (!values.confirmPassword) {
            inputErrors.confirmPasswordError = true
            inputErrors.confirmPasswordMsg = "Confirm password is required"
            valid = false
        }

        if (valid) {
            if (values.password !== values.confirmPassword) {
                inputErrors.passwordError = true
                inputErrors.confirmPasswordError = true
                inputErrors.passwordMsg = "Passwords don't match"
                inputErrors.confirmPasswordMsg = "Passwords don't match"
                valid = false
            }
        }




        if (!valid) {
            this.setState({ inputErrors })
        } else {
            /* Signup */
            values.password = MD5(values.password)
            this.props.signup(values).then(() => {
                if (this.props.user.msg === "USER_REGISTERED_SUCCESSFULLY") {
                    setSession('USER', this.props.user.info)
                    this.props.onSignup()
                }
            })

        }
    }

    handleInputChange = key => event => {
        const value = event.target.value
        let inputErrors = this.state.inputErrors
        if (key === "firstName") {
            inputErrors.firstnameError = false
            delete inputErrors.firstnameMsg
        } else if (key === "lastName") {
            inputErrors.lastnameError = false
            delete inputErrors.lastnameMsg
        } else if (key === "email") {
            inputErrors.emailError = false
            delete inputErrors.emailMsg
        } else if (key === "password") {
            inputErrors.passwordError = false
            delete inputErrors.passwordMsg
        } else if (key === "confirmPassword") {
            inputErrors.confirmPasswordError = false
            delete inputErrors.confirmPasswordMsg
            if (inputErrors.passwordError) {
                inputErrors.passwordError = false
                delete inputErrors.passwordMsg
            }

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
                            <Typography variant="title"  >Signup</Typography>
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <Typography className="error-alert">{this.props.user.error ? getServerMessage(this.props.user.error) : ''}</Typography>
                                <Grid container spacing={8}>

                                    <Grid item xs={6} >
                                        <TextField
                                            autoFocus
                                            error={inputErrors.firstnameError ? true : false}
                                            helperText={inputErrors.firstnameMsg}
                                            value={user.firstName}
                                            onChange={this.handleInputChange('firstName')}
                                            margin="dense"
                                            id="firstName"
                                            name="firstname"
                                            label="Firstname"
                                            type="text"
                                            fullWidth={true}

                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TextField
                                            error={inputErrors.lastnameError ? true : false}
                                            helperText={inputErrors.lastnameMsg}
                                            value={user.lastName}
                                            margin="dense"
                                            id="lastName"
                                            label="Lastname"
                                            name="lastname"
                                            type="text"
                                            fullWidth={true}
                                            onChange={this.handleInputChange('lastName')}

                                        />
                                    </Grid>
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
                                    <Grid item xs={6} >
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
                                    <Grid item xs={6} >
                                        <TextField
                                            error={inputErrors.confirmPasswordError ? true : false}
                                            helperText={inputErrors.confirmPasswordMsg}
                                            margin="dense"
                                            value={user.confirmPassword}
                                            onChange={this.handleInputChange('confirmPassword')}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            label="Confirm password"
                                            fullWidth={true}
                                            type="password"
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={8} justify="center" >
                                    <Button color="primary" variant="outlined" type="submit" >{this.props.user.isSigningUp ? 'Loading...' : 'Signup'}</Button>
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
        signup: user => dispatch(signup(user))
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(Signup)
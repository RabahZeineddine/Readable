import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import './Header.css'
import { Button } from '@material-ui/core';
import { deleteSession } from '../../utils/util'
import { logout } from '../../actions/userActions'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 0.05,
    }
};

class Header extends React.Component {


    logout = () => {
        deleteSession('USER')
        this.props.logout()
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar elevation={1} position="static" color={`inherit`} >
                    <Toolbar className="header">
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            <Link to="/" className="header-link">Readable</Link>
                        </Typography>
                        {!this.props.user.isLogged ? (
                            <div>
                                <Link to="/login" className="header-link">
                                    <Button>Login</Button>
                                </Link>
                                <Link to="/signup" className="header-link">
                                    <Button>Signup</Button>
                                </Link>
                            </div>
                        ) :
                            <Button onClick={() => this.logout()}>logout</Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

const mapDispatchToState = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToState)(withStyles(styles)(Header));
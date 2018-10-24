import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import './Header.css'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 0.05,
    }
};

class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar elevation={1} position="static" color={`inherit`} >
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            <Link to="/" className="header-link">Readable</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
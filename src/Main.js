import React, { useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router } from 'react-router-dom';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import { getProfileFetch } from "./redux/actions";
import { connect } from 'react-redux';
import Dashboard from './pages/Dashboard'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    register: {
        textDecoration: 'none',
        color: 'white'
    }
}));

function App({getProfileFetch, isLoggedIn}) {
    const classes = useStyles();
    useEffect(()=> {
        getProfileFetch()
    }, [getProfileFetch]);
    if(isLoggedIn) {
        return <Redirect to='/'/>;
    }
  return (
      <Router>
          <div className="App">
              <AppBar position="static">
                  <Toolbar>
                      <Typography variant="h6" className={classes.title}>
                          Point of Sale System
                      </Typography>
                      <Link to="/register" className={classes.register}>
                          <Button color="inherit">Register</Button>
                      </Link>
                  </Toolbar>
              </AppBar>
              <Switch>
                  <Route path="/register" component={Register}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/" component={Dashboard}/>
              </Switch>
          </div>
      </Router>
  );
}

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch())
});

const mapStateToProps = state => {
    return {
        isLoggedIn: state.currentUser !== null,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

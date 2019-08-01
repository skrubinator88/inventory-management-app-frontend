import React from 'react';
import {connect} from "react-redux";
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...props }) => {
    console.log(isLoggedIn);
    return (
        <Route
            {...props}
            render={props => (
                isLoggedIn ?
                    <Component {...props} /> :
                    <Redirect to='/login' />
            )}
        />
    );
}

const mapStateToProps = state => {
    console.log(state);
    return {
        isLoggedIn: !!state.currentUser,
    }
};

export default connect(mapStateToProps)(ProtectedRoute);
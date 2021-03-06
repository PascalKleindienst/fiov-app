// ==============================================
// PRIVATE ROUTER ===============================
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Private Route Component
export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />        
                <Footer />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

// PropTypes
PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func
};

// States
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.id
});

export default connect(mapStateToProps)(PrivateRoute);

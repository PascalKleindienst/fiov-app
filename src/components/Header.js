// ==============================================
// HEADER COMPONENT==============================
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { logout } from '../actions/auth';

// Header Component
export const Header = ({ auth, isAuthenticated, logout, translate }) => (
    <header className="header">
        <div className="content-container">
            { isAuthenticated ? (
                <div className="header__content">
                    <Link className="header__title" to="/dashboard">
                        <h1>{ translate('title') }</h1>
                    </Link>
                    <div className="header__nav">
                        <NavLink to="/add" className="header__nav__item" activeClassName="header__nav__item--active">
                            { translate('transactions.add_transaction') }
                        </NavLink>
                        
                        <div className="profile has-dropdown">
                            <img src={ auth.picture } alt="" className="profile__picture" />
                            <div className="dropdown-menu">
                                <div className="dropdown-menu__header">
                                    <strong>{ translate('user.account') }</strong>
                                </div>
                                <Link className="dropdown-menu__item" to="/profile">
                                    { translate('user.profile') }
                                </Link>
                                <Link className="dropdown-menu__item logout" onClick={logout} to="#">
                                    { translate('user.logout') }
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>{ translate('title') }</h1>
                    </Link>
                    <div className="header__nav">
                        <Link to="/login" className="header__nav__item">{ translate('menu.login') }</Link>
                    </div>
                </div>
            )}
        </div>
    </header>
);

// PropTypes
Header.propTypes = {
    auth: PropTypes.shape({
        picture: PropTypes.string,
    }),
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
};

// States
const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: !!state.auth.id,
    translate: getTranslate(state.locale)
});

// Dispatch Functions
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

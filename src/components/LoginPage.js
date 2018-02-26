// ==============================================
// LOGIN PAGE COMPONENT =========================
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';

export const LoginPage = ({ translate }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">{ translate('title') }</h1>
            <p>{ translate('subtitle') }</p>
            <p>
                <a className="button" href="/auth/twitter">{ translate('twitterLogin') }</a>
            </p>
            <p>
                <a className="button" href="/auth/facebook">{ translate('facebookLogin') }</a>
            </p>
            <p>
                <a className="button" href="/auth/google">{ translate('googleLogin') }</a>
            </p>
        </div>
    </div>
);

// PropTypes
LoginPage.propTypes = {
    translate: PropTypes.func.isRequired
};

export default localize(LoginPage, 'locale');

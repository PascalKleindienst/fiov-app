// ==============================================
// HOME PAGE COMPONENT ========)=================
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { localize } from 'react-localize-redux';

const Footer = ({ translate }) => (
    <footer className="footer">
        <div className="content-container">
            <div className="footer__content">
                <Link to="/imprint">{ translate('menu.imprint') }</Link>
                <Link to="/privacy">{ translate('menu.privacy') }</Link>
            </div>
        </div>
    </footer>
);

// PropTypes
Footer.propTypes = {
    translate: PropTypes.func.isRequired
};

export default localize(Footer, 'locale');

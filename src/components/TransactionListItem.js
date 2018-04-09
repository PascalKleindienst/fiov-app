// ==============================================
// TRANSACTION LIST ITEM PAGE COMPONENT =========
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const TransactionListItem = ({ id, description, amount, createdAt }) => (
    <Link className={ amount < 0 ? 'list-item list-item--expense' : 'list-item' } to={`/edit/${id}`}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{ moment(createdAt).format('LL') }</span>
        </div>
        <h3 className="list-item__data">
            {numeral(amount / 100).format('-0,0.00$')}
        </h3>
    </Link>
);

// PropTypes
TransactionListItem.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
};

export default TransactionListItem;
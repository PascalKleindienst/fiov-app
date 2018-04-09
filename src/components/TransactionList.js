// ==============================================
// TRANSACTION LIST PAGE COMPONENT ==============
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import TransactionListItem from './TransactionListItem';

export const TransactionList = ({ transactions, translate }) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-mobile">{ translate('transactions.transactions') }</div>
            <div className="show-desktop">{ translate('transactions.transaction') }</div>
            <div className="show-desktop">{ translate('transactions.amount') }</div>
        </div>
        <div className="list-body">
            {
                transactions.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>{ translate('transactions.no_transactions') }</span>
                    </div>
                ) : (
                    transactions.map((transaction) => <TransactionListItem key={transaction.id} {...transaction} />)
                )
            }
        </div>
    </div>
);

// PropTypes
TransactionList.propTypes = {
    transactions: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired
};

// States
const mapStateToProps = (state) => ({
    transactions: state.transactions,
    translate: getTranslate(state.locale)
});

export default connect(mapStateToProps)(TransactionList);
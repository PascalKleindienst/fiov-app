// ==============================================
// TRANSACTIONS SUMMARY COMPONENT ===============
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTranslate } from 'react-localize-redux';
import getTransactionsTotal from '../selectors/transactions-total';
import getVisibleTransactions from '../selectors/transactions';
import numeral from 'numeral';

export const TransactionsSummary = ({ translate, transactionCount, transactionsTotal, transactionNotVisibleCount }) => (
    <div className="page-header">
        <div className="content-container">
            <h2 className="page-header__title">
                { translate('transactions.total', { count: transactionCount, amount: numeral(transactionsTotal / 100).format('$0,0.00') }) }
                <p>
                    { transactionNotVisibleCount
                        ? (translate('transactions.not_visible_filter', { count: transactionNotVisibleCount }))
                        : (translate('transactions.not_filtered'))
                    }
                </p>
            </h2>
            <div className="page-header__actions">
                <Link className="button" to="/add">{ translate('transactions.add_transaction') }</Link>
            </div>
        </div>
    </div>
);

// PropTypes
TransactionsSummary.propTypes = {
    translate: PropTypes.func.isRequired,
    transactionCount: PropTypes.number.isRequired,
    transactionsTotal: PropTypes.number.isRequired,
    transactionNotVisibleCount: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    const visibletransactions = getVisibleTransactions(state.transactions, state.filters);

    return {
        translate: getTranslate(state.locale),
        transactionCount: visibletransactions.length,
        transactionsTotal: getTransactionsTotal(visibletransactions),
        transactionNotVisibleCount: state.transactions.length - visibletransactions.length
    };
};

export default connect(mapStateToProps)(TransactionsSummary);
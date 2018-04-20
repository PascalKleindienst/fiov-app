// ==============================================
// ADD TRANSACTION PAGE COMPONENT ===============
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import TransactionForm from './TransactionForm';
import { addTransaction } from '../actions/transactions';

export class AddTransactionPage extends React.Component {
    onSubmit = (transaction) => {
        this.props.addTransaction(transaction);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h2 className="page-header__title">{ this.props.translate('transactions.add_transaction') }</h2>
                    </div>
                </div>
                <div className="content-container">
                    <TransactionForm onSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
}

// PropTypes
AddTransactionPage.propTypes = {
    translate: PropTypes.func.isRequired,
    addTransaction: PropTypes.func.isRequired
};

// States
const mapStateToProps = (state) => ({
    translate: getTranslate(state.locale)
});

// Dispatch
const mapDispatchToProps = (dispatch) => ({
    addTransaction: (transaction) => dispatch(addTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionPage);
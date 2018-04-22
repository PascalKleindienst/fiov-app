// ==============================================
// EDIT TRANSACTION PAGE COMPONENT ==============
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import TransactionForm from './TransactionForm';
import { editTransaction, removeTransaction } from '../actions/transactions';
import DeleteTransactionModal from './DeleteTransactionModal';

export class EditTransactionPage extends React.Component {
    /**
     * Sets showModal state to false
     */
    constructor () {
        super();
        this.state = {
            showModal: false
        };
    }

    /**
     * Open Modal
     */
    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    /**
     * Close Modal
     */
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    /**
     * Edit Transaction
     */
    onSubmit = (transaction) => {
        this.props.editTransaction(this.props.transaction.id, transaction);
        this.props.history.push('/');
    }

    /**
     * Remove Transaction
     */
    onRemove = () => {
        this.props.removeTransaction({ id: this.props.transaction.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h2 className="page-header__title">{ this.props.translate('transactions.edit_transaction') }</h2>
                    </div>
                </div>
                <div className="content-container">
                    <TransactionForm
                        transaction={this.props.transaction}
                        onSubmit={this.onSubmit}
                    />

                    <button className="button button--secondary button--remove" onClick={this.handleOpenModal}>{ this.props.translate('transactions.remove_transaction') }</button>
                </div>
                <DeleteTransactionModal
                    isOpen={this.state.showModal}
                    handleClose={this.handleCloseModal}
                    handleConfirmation={this.onRemove}
                />
            </div>
        );
    }
};

// PropTypes
EditTransactionPage.propTypes = {
    translate: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    transaction: PropTypes.object.isRequired,
    editTransaction: PropTypes.func.isRequired,
    removeTransaction: PropTypes.func.isRequired
};

// States
const mapStateToProps = (state, props) => ({
    translate: getTranslate(state.locale),
    transaction: state.transactions.find((transaction) => transaction.id == props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    editTransaction: (id, transaction) => dispatch(editTransaction(id, transaction)),
    removeTransaction: (data) => dispatch(removeTransaction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTransactionPage);
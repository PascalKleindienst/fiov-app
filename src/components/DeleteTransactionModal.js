// ==============================================
// DELETE TRANSACTION MODAL COMPONENT ===========
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { localize } from 'react-localize-redux';

export const DeleteTransactionModal = (props) => (
    <Modal
        isOpen={!!props.isOpen}
        contentLabel={ props.translate('transactions.modal.delete') }
        onRequestClose={props.handleClose}
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
        style={{ overlay: {backgroundColor: 'rgba(0,0,0,.75)' }}}
    >
        <h3 className="modal__title">{ props.translate('transactions.modal.delete') }</h3>
        <p className="modal__body">{ props.translate('transactions.modal.confirm') }</p>
        <div className="modal__actions">
            <button className="button" onClick={props.handleConfirmation}>{ props.translate('transactions.modal.delete') }</button>
            <button className="button button--secondary" onClick={props.handleClose}>{ props.translate('cancel') }</button>
        </div>
    </Modal>
);

// PropTypes
DeleteTransactionModal.propTypes = {
    translate: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleConfirmation: PropTypes.func.isRequired
};

export default localize(DeleteTransactionModal, 'locale');
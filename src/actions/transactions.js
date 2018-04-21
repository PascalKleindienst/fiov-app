// ==============================================
// TRANSACTIONS ACTIONS =========================
// ==============================================
import ajax from 'fetchival';
const ajaxOptions = { mode: 'cors', credentials: 'same-origin' };

// =============== Add Transaction ===============
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const addTransaction = (transactionData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0,
        } = transactionData;

        const transaction = { description, note, amount, createdAt };

        return ajax('/api/transactions', ajaxOptions).post(transaction).then((ref) => {
            dispatch({
                type: ADD_TRANSACTION,
                transaction: {
                    id: ref.id,
                    ...transaction
                }
            });
        });
    };
};

// =============== Remove Transaction ===============
export const REMOVE_TRANSACTION = 'REMOVE_TRANSACTION';
export const removeTransaction = ({ id } = {}) => {
    return (dispatch) => {
        return ajax('/api/transactions/' + id, ajaxOptions).delete({ id }).then(() => {
            dispatch({
                type: REMOVE_TRANSACTION,
                id
            });
        });
    };
};

// =============== Update Transaction ===============
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';
export const editTransaction = (id, updates) => {
    return (dispatch) => {
        return ajax('/api/transactions/' + id, ajaxOptions).patch(updates).then(() => {
            dispatch({
                type: EDIT_TRANSACTION,
                id,
                updates
            });
        });
    };
};

// =============== Set Transactions ===============
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const setTransactions = () => {
    return (dispatch) => {
        return ajax('/api/transactions', ajaxOptions).get().then((transactions) => {
            dispatch({
                type: SET_TRANSACTIONS,
                transactions
            });
        });
    };
};
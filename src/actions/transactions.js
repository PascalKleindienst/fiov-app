// ==============================================
// TRANSACTIONS ACTIONS =========================
// ==============================================
import ajax from 'fetchival';

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

        return ajax('/api/transactions', { mode: 'cors', credentials: 'same-origin' }).post(transaction).then((ref) => {
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

// =============== Update Transaction ===============

// =============== Set Transactions ===============
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const setTransactions = () => {
    return (dispatch) => {
        return ajax('/api/transactions', { mode: 'cors', credentials: 'same-origin' }).get().then((transactions) => {
            dispatch({
                type: SET_TRANSACTIONS,
                transactions
            });
        });
    };
};
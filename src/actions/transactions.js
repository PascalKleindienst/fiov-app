// ==============================================
// TRANSACTIONS ACTIONS =========================
// ==============================================
import ajax from 'fetchival';

// =============== Add Transaction ===============

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
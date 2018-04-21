// ==============================================
// TRANSACTIONS REDUCERS ========================
// ==============================================
import { SET_TRANSACTIONS, ADD_TRANSACTION, EDIT_TRANSACTION, REMOVE_TRANSACTION } from '../actions/transactions';

const transactionsReducerDefaultState = [];

export default (state = transactionsReducerDefaultState, action) => {
    switch (action.type) {
    case ADD_TRANSACTION:
        return [
            ...state,
            action.transaction
        ];
    case REMOVE_TRANSACTION:
        return state.filter(({ id }) => id !== action.id);
    case EDIT_TRANSACTION:
        return state.map((transaction) => {
            if (transaction.id === action.id) {
                return {
                    ...transaction,
                    ...action.updates
                };
            }
            return transaction;
        });
    case SET_TRANSACTIONS:
        return action.transactions;
    default:
        return state;
    }
};

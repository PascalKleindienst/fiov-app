// ==============================================
// TRANSACTIONS REDUCERS ========================
// ==============================================
import { SET_TRANSACTIONS, ADD_TRANSACTION } from '../actions/transactions';

const transactionsReducerDefaultState = [];

export default (state = transactionsReducerDefaultState, action) => {
    switch (action.type) {
    case ADD_TRANSACTION:
        return [
            ...state,
            action.transaction
        ];
    case SET_TRANSACTIONS:
        return action.transactions;
    default:
        return state;
    }
};

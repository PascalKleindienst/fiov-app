// ==============================================
// TRANSACTIONS REDUCERS ========================
// ==============================================
import { SET_TRANSACTIONS } from '../actions/transactions';

const transactionsReducerDefaultState = [];

export default (state = transactionsReducerDefaultState, action) => {
    switch (action.type) {
    case SET_TRANSACTIONS:
        return action.transactions;
    default:
        return state;
    }
};

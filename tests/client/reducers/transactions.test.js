// ==============================================
// TRANSACTIONS REDUCER TEST ====================
// ==============================================
import transactionsReducer from '../../../src/reducers/transactions';
import { SET_TRANSACTIONS, ADD_TRANSACTION } from '../../../src/actions/transactions';
import transactions from '../fixtures/transactions';

describe('my transactions reducer', () => {
    test('should set default state', () => {
        const state = transactionsReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual([]);
    });

    test('should set transactions', () => {
        const action = {
            type: SET_TRANSACTIONS,
            transactions: [transactions[1]]
        };
    
        const state = transactionsReducer(transactions, action);
        expect(state).toEqual([transactions[1]]);
    });

    test('should add transaction', () => {
        const action = {
            type: ADD_TRANSACTION,
            transaction: transactions[2]
        };
    
        const state = transactionsReducer(transactions[2], action);
        expect(state).toEqual([transactions[2]]);
    });
});
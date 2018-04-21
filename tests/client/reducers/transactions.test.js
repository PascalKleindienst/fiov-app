// ==============================================
// TRANSACTIONS REDUCER TEST ====================
// ==============================================
import transactionsReducer from '../../../src/reducers/transactions';
import { SET_TRANSACTIONS, ADD_TRANSACTION, EDIT_TRANSACTION, REMOVE_TRANSACTION } from '../../../src/actions/transactions';
import transactions from '../fixtures/transactions';

describe('my transactions reducer', () => {
    test('should set default state', () => {
        const state = transactionsReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual([]);
    });

    test('should remove transaction by id', () => {
        const action = {
            type: REMOVE_TRANSACTION,
            id: transactions[1].id
        };
        const state = transactionsReducer(transactions, action);
        expect(state).toEqual([ transactions[0], transactions[2] ]);
    });

    test('should not remove transactions if id is not found', () => {
        const action = {
            type: REMOVE_TRANSACTION,
            id: -1
        };
        const state = transactionsReducer(transactions, action);
        expect(state).toEqual(transactions);
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
    
        const state = transactionsReducer([], action);
        expect(state).toEqual([transactions[2]]);
    });
    
    test('should edit an transaction', () => {
        const updates = {
            description: 'Updated transaction',
            amount: 4200
        };
        const action = {
            type: EDIT_TRANSACTION,
            id: transactions[1].id,
            updates
        };
        const state = transactionsReducer(transactions, action);
        expect(state).toEqual([ transactions[0], {...transactions[1], ...updates}, transactions[2] ]);
    });

    test('should not edit an transaction if transaction is not found', () => {
        const updates = {
            description: 'Updated transaction',
            amount: 4200
        };
        const action = {
            type: EDIT_TRANSACTION,
            id: '-1',
            updates
        };
        const state = transactionsReducer(transactions, action);
        expect(state).toEqual(transactions);
    });
});
// ==============================================
// TRANSACTIONS ACTION TEST =====================
// ==============================================
// Mocks
const helpers = require('../../helpers');
import ajax from 'fetchival';
jest.mock('fetchival');

// Dependencies
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
    SET_TRANSACTIONS, setTransactions,
    ADD_TRANSACTION, addTransaction,
    REMOVE_TRANSACTION, removeTransaction,
    EDIT_TRANSACTION, editTransaction
} from '../../../src/actions/transactions';
import transactions from '../fixtures/transactions';

const createMockStore = configureMockStore([thunk]);

describe('my transactions action', () => {
    let store;

    beforeEach(() => {
        store = createMockStore({});
    });

    test('should setup remove Transaction action object', () => {
        ajax.mockImplementation(() => ({ delete: helpers.resolvePromise() }));

        store.dispatch(removeTransaction({ id: 42 })).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: REMOVE_TRANSACTION,
                id: 42
            });
        });
    });
    
    test('should setup remove Transaction action object with an undefined id', () => {
        ajax.mockImplementation(() => ({ delete: helpers.resolvePromise() }));

        store.dispatch(removeTransaction()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: REMOVE_TRANSACTION,
                id: undefined
            });
        });
    });

    test('should edit a transaction sent to server', () => {
        const updates = { note: 'New Note value' };
        ajax.mockImplementation(() => ({ patch: helpers.resolvePromise() }));

        store.dispatch(editTransaction(transactions[2].id, updates)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: EDIT_TRANSACTION,
                id: transactions[2].id,
                updates
            });
        });
    });

    test('should add a transaction sent to server', () => {
        ajax.mockImplementation(() => ({ post: helpers.resolvePromise({ ...transactions[2], id: 42 } ) }));

        store.dispatch(addTransaction(transactions[2])).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: ADD_TRANSACTION,
                transaction: { ...transactions[2], id: 42 }
            });
        });
    });

    test('should setup transactions fetched from server', () => {
        ajax.mockImplementation(() => ({ get: helpers.resolvePromise(transactions) }));

        store.dispatch(setTransactions()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: SET_TRANSACTIONS,
                transactions
            });
        });
    });
});

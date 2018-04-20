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
import { SET_TRANSACTIONS, setTransactions, ADD_TRANSACTION, addTransaction } from '../../../src/actions/transactions';
import transactions from '../fixtures/transactions';

const createMockStore = configureMockStore([thunk]);

describe('my transactions action', () => {
    test('should add a transaction sent to server', () => {
        const store = createMockStore({});
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
        const store = createMockStore({});
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

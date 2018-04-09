// ==============================================
// TRANSACTIONS ACTION TEST =====================
// ==============================================
// Mocks
import ajax from 'fetchival';
jest.mock('fetchival');

// Dependencies
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { SET_TRANSACTIONS, setTransactions } from '../../../src/actions/transactions';
import transactions from '../fixtures/transactions';

const createMockStore = configureMockStore([thunk]);

describe('my transactions action', () => {
    test('should setup transactions fetched from server', () => {
        const store = createMockStore({});
        ajax.mockImplementation(() => ({
            get: jest.fn(() => new Promise((resolve, reject) => {
                resolve(transactions);
            }))
        }));

        store.dispatch(setTransactions()).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: SET_TRANSACTIONS,
                transactions
            });
        });
    });
});
// ==============================================
// ADD TRANSACTION PAGE TEST ====================
// ==============================================
// Mocks
const helpers = require('../../helpers');
import ajax from 'fetchival';
jest.mock('fetchival');

// Dependencies
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import AddTransactionPageContainer, { AddTransactionPage } from '../../../src/components/AddTransactionPage';
import transactions from '../fixtures/transactions';

const mockStore = configureMockStore([thunk]);

describe('my AddTransactionPage component', () => {
    let wrapper, history, addTransaction;

    beforeEach(() => {
        addTransaction = jest.fn();
        history = { push: jest.fn() };
        wrapper = shallow(<AddTransactionPage addTransaction={addTransaction} history={history} translate={ (msg) => msg } />);
    });

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle onSubmit', () => {
        wrapper.find('Connect(TransactionForm)').prop('onSubmit')(transactions[1]);

        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(addTransaction).toHaveBeenLastCalledWith(transactions[1]);
    });

    test('should add transaction on form submit', () => {
        ajax.mockImplementation(() => ({ post: helpers.resolvePromise({ id: 1 }) }));
        const store = mockStore({
            locale: { languages: ['en'] }
        });
        const wrapper = shallow(<AddTransactionPageContainer store={store} />);
        
        return wrapper.props().addTransaction(transactions[1]).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({ type: 'ADD_TRANSACTION', transaction: { ...transactions[1], id: 1} });
        });
    });
});

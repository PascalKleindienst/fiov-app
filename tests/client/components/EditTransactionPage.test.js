// ==============================================
// EDIT TRANSACTION PAGE TEST ===================
// ==============================================
// Mocks
const helpers = require('../../helpers');
import ajax from 'fetchival';
jest.mock('fetchival');

// Dependencies
import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import EditTransactionPageContainer, { EditTransactionPage } from '../../../src/components/EditTransactionPage';
import transactions from '../fixtures/transactions';

const mockStore = configureMockStore([thunk]);

describe('my EditTransactionPage component', () => {
    let editTransaction, removeTransaction, translate, history, wrapper;

    beforeEach(() => {
        translate = jest.fn((msg) => msg);
        editTransaction = jest.fn();
        removeTransaction = jest.fn();
        history = { push: jest.fn() };
        wrapper = shallow(<EditTransactionPage editTransaction={editTransaction} removeTransaction={removeTransaction} translate={translate} history={history} transaction={transactions[1]} />);
    });

    test('should render EditTransactionPage correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle editTransaction', () => {
        wrapper.find('Connect(TransactionForm)').prop('onSubmit')(transactions[2]);

        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(editTransaction).toHaveBeenLastCalledWith(transactions[1].id, transactions[2]);
    });
    
    test('should handle openModal', () => {
        wrapper.instance().handleOpenModal();
        expect(wrapper.instance().state).toEqual({ showModal: true });
    });

    test('should handle closeModal', () => {
        wrapper.instance().handleCloseModal();
        expect(wrapper.instance().state).toEqual({ showModal: false });
    });

    test('should handle removeTransaction', () => {
        wrapper.instance().onRemove();
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(removeTransaction).toHaveBeenLastCalledWith({ id: transactions[1].id });
    });

    test('should edit transaction on form submit', () => {
        const id = transactions[1].id;
        const store = mockStore({
            locale: { languages: ['en'] },
            transactions
        });
        const wrapper = shallow(<EditTransactionPageContainer store={store} history={history} match={ { params: { id } } } />);
        ajax.mockImplementation(() => ({ patch: helpers.resolvePromise({ id }) }));
        
        return wrapper.props().editTransaction(id, transactions[1]).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({ type: 'EDIT_TRANSACTION', id,  updates: transactions[1] });
        });
    });
    
    test('should remove transaction on confirmation', () => {
        const id = transactions[1].id;
        const store = mockStore({
            locale: { languages: ['en'] },
            transactions
        });
        const wrapper = shallow(<EditTransactionPageContainer store={store} history={history} match={ { params: { id } } } />);
        ajax.mockImplementation(() => ({ delete: helpers.resolvePromise({ id }) }));
        
        return wrapper.props().removeTransaction({ id }).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({ type: 'REMOVE_TRANSACTION', id });
        });
    });
});
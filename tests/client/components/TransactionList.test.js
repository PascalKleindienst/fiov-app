// ==============================================
// TRANSACTIONLIST PAGE TEST ====================
// ==============================================
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import TransactionListContainer, { TransactionList } from '../../../src/components/TransactionList';
import transactions from '../fixtures/transactions';

describe('my transaction list component', () => {
    const mockStore = configureMockStore([thunk]);

    test('should contain transactions', () => {
        const store = mockStore({
            locale: { languages: ['en'] },
            transactions: transactions
        });
        const wrapper = shallow(<TransactionListContainer store={store} />);
        expect(wrapper.props().transactions).toEqual(transactions);
    });

    test('should render correctly for no transactions', () => {
        const wrapper = shallow(<TransactionList transactions={[]} translate={ (msg) => msg } />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly for transactions', () => {
        const wrapper = shallow(<TransactionList transactions={transactions} translate={ (msg) => msg } />);
        expect(wrapper).toMatchSnapshot();
    });
});

// ==============================================
// TRANSACTIONSSUMMARY COMPONENT TEST ===========
// ==============================================
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Container, { TransactionsSummary } from '../../../src/components/TransactionsSummary';
import transactions from '../fixtures/transactions';

describe('my transaction summary component', () => {
    const mockStore = configureMockStore([thunk]);
    const translate = jest.fn(msg => msg);

    test('should render component with multiple transactions correctly', () => {
        const wrapper = shallow(<TransactionsSummary transactionNotVisibleCount={0} transactionCount={21} transactionsTotal={133742} translate={translate} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render component with 1 transaction correctly', () => {
        const wrapper = shallow(<TransactionsSummary transactionNotVisibleCount={0} transactionCount={1} transactionsTotal={9434} translate={translate} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render component with 1 filtered transaction correctly', () => {
        const wrapper = shallow(<TransactionsSummary transactionNotVisibleCount={1} transactionCount={2} transactionsTotal={9434} translate={translate} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should set props correctly', () => {
        const store = mockStore({
            locale: { languages: ['en'] },
            filters: { text: '', sortBy: '', startDate: undefined, endDate: undefined },
            transactions
        });
        const wrapper = shallow(<Container store={store} />);
        expect(wrapper.props().transactionCount).toBe(3);
        expect(wrapper.props().transactionsTotal).toBe(-105199);
        expect(wrapper.props().transactionNotVisibleCount).toBe(0);
    });
});
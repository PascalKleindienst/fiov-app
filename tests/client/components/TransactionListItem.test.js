// ==============================================
// TRANSACTIONLISTITEM PAGE TEST ================
// ==============================================
import React from 'react';
import { shallow } from 'enzyme';
import TransactionListItem from '../../../src/components/TransactionListItem';

describe('my transaction list item component', () => {
    test('should render correctly', () => {
        const props = {
            id: 123,
            description: "Some Desc",
            amount: 123456,
            createdAt: "2018-01-01"
        }
        const wrapper = shallow(<TransactionListItem {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly for expenses', () => {
        const props = {
            id: 123,
            description: "Some Desc",
            amount: -123456,
            createdAt: "2018-01-01"
        }
        const wrapper = shallow(<TransactionListItem {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

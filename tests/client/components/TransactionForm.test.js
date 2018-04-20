// ==============================================
// TRANSACTION FORM TEST ========================
// ==============================================
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { TransactionForm } from '../../../src/components/TransactionForm';
import transactions from '../fixtures/transactions';


describe('my TransactionForm component', () => {
    transactions[0].createdAt = transactions[0].createdAt.replace(/ /g, '-'); // fix for depreacted YYYY MM DD format
    let wrapperContainer;
    
    beforeEach(() => {
        wrapperContainer = shallow(<TransactionForm translate={ (msg) => msg } onSubmit={ () => false } />);
    });

    test('should render TransactionForm correctly', () => {
        expect(wrapperContainer).toMatchSnapshot();
    });

    test('should render TransactionForm with transaction data', () => {
        const wrapper = shallow(<TransactionForm transaction={transactions[0]} translate={ (msg) => msg } onSubmit={ () => false } />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render error for invalid form submission', () => {
        expect(wrapperContainer).toMatchSnapshot();

        wrapperContainer.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        expect(wrapperContainer.state('error').length).toBeGreaterThan(0);
        expect(wrapperContainer).toMatchSnapshot();
    });

    test('should set description on input change', () => {
        const value = 'New description';
        wrapperContainer.find('input').at(0).simulate('change', {
            target: { value }
        });
        expect(wrapperContainer.state('description')).toBe(value);
    });

    test('should set note on textarea change', () => {
        const value = 'New note';
        wrapperContainer.find('textarea').at(0).simulate('change', {
            target: { value }
        });
        expect(wrapperContainer.state('note')).toBe(value);
    });

    test('should set amount if valid input', () => {
        const value = '23.50';
        wrapperContainer.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapperContainer.state('amount')).toBe(value);
    });

    test('should set negative amount if valid input', () => {
        const value = '-23.50';
        wrapperContainer.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapperContainer.state('amount')).toBe(value);
    });

    test('should not set amount if invalid input', () => {
        const value = '12.122';
        wrapperContainer.find('input').at(1).simulate('change', {
            target: { value }
        });
        expect(wrapperContainer.state('amount')).toBe('');
    });

    test('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<TransactionForm transaction={transactions[0]} onSubmit={onSubmitSpy} translate={ (msg) => msg } />);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        expect(wrapper.state('error')).toBe('');
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: transactions[0].description,
            amount: transactions[0].amount,
            createdAt: moment(transactions[0].createdAt).format(),
            note: transactions[0].note,
        });
    });

    test('should set new date on date change', () => {
        const now = moment();

        wrapperContainer.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
        expect(wrapperContainer.state('createdAt')).toEqual(now);
    });

    test('should not set a new date on date change if date is empty/false', () => {
        const wrapper = shallow(<TransactionForm transaction={transactions[0]} translate={ (msg) => msg } onSubmit={ () => false } />);

        wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')();
        expect(wrapper.state('createdAt')).toEqual(moment(transactions[0].createdAt));
    });

    test('should set calendar focus on change', () => {
        const focused = true;

        wrapperContainer.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
        expect(wrapperContainer.state('calendarFocused')).toBe(focused);
    });

    test('should set isOutsideRange always to false', () => {
        const isOutsideRange = wrapperContainer.find('withStyles(SingleDatePicker)').prop('isOutsideRange');
        expect(isOutsideRange()).toBe(false);
    });
});
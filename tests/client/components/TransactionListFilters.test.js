// ==============================================
// TRANSACTIONLISTFILTERS PAGE TEST =============
// ==============================================
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import TransactionListFiltersContainer, { TransactionListFilters } from '../../../src/components/TransactionListFilters';
import { filters, altFilters } from '../fixtures/filters';

describe('my transaction list filter component', () => {
    const mockStore = configureMockStore([thunk]);
    let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, translate, wrapper, container, store;

    beforeEach(() => {
        setTextFilter = jest.fn();
        sortByDate = jest.fn();
        sortByAmount = jest.fn();
        setStartDate = jest.fn();
        setEndDate = jest.fn();
        translate = jest.fn((msg) => msg);
        wrapper = shallow(
            <TransactionListFilters
                filters={filters}
                setTextFilter={setTextFilter}
                sortByDate={sortByDate}
                sortByAmount={sortByAmount}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                translate={translate}
            />
        )

        store = mockStore({
            locale: { languages: ['en'] },
            filters: { text: '', sortBy: '', startDate: undefined, endDate: undefined },
        });
        container = shallow(<TransactionListFiltersContainer store={store} />);
    });

    test('should render TransactionListFilters correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should render TransactionListFilters with alt data correctly', () => {
        wrapper.setProps({
            filters: altFilters
        });
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle text change', () => {
        const text = 'rent';
        wrapper.find('input').simulate('change', {
            target: { value: text }
        });

        expect(setTextFilter).toHaveBeenLastCalledWith(text);
    });

    test('should sort by date', () => {
        wrapper.setProps({
            filters: altFilters
        });
        wrapper.find('select').simulate('change', {
            target: { value: 'date' }
        });

        expect(sortByDate).toHaveBeenCalled();
    });

    test('should sort by amount', () => {
        wrapper.find('select').simulate('change', {
            target: { value: 'amount' }
        });

        expect(sortByAmount).toHaveBeenCalled();
    });

    test('should not sort', () => {
        wrapper.find('select').simulate('change', {
            target: { value: '' }
        });

        expect(sortByAmount).not.toHaveBeenCalled();
    })

    test('should handle date changes', () => {
        const dates = { startDate: altFilters.startDate, endDate: altFilters.endDate };
        wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(dates);

        expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
        expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
    });

    test('should handle date focus changes', () => {
        const focused = 'endDate';

        wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
        expect(wrapper.state('calendarFocused')).toBe(focused);
    });

    test('should set isOutsideRange always to false', () => {
        const isOutsideRange = wrapper.find('withStyles(DateRangePicker)').prop('isOutsideRange');
        expect(isOutsideRange()).toBe(false);
    });

    test('should set text filter', () => {
        expect(container.props().setTextFilter('foo')).toEqual({ type: 'SET_TEXT_FILTER', text: 'foo' });
    });

    test('should sortByDate', () => {
        expect(container.props().sortByDate()).toEqual({ type: 'SORT_BY', sortBy: 'date' });
    });

    test('should sortByAmount', () => {
        expect(container.props().sortByAmount()).toEqual({ type: 'SORT_BY', sortBy: 'amount' });
    });

    test('should setStartDate', () => {
        expect(container.props().setStartDate(0)).toEqual({ type: 'SET_START_DATE', startDate: 0 });
    });
    
    test('should setEndDate', () => {
        expect(container.props().setEndDate(0)).toEqual({ type: 'SET_END_DATE', endDate: 0 });
    });
});
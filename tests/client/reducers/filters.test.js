// =========================================
// FILTERS REDUCERS TEST =====================
// =========================================
import moment from 'moment';
import filtersReducer from '../../../src/reducers/filters';
import { SET_TEXT_FILTER, SORT_BY, SET_START_DATE, SET_END_DATE, } from '../../../src/actions/filters';

describe('my filters reducers', () => {
    test('should setup default filter values', () => {
        const state = filtersReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        });
    });
    
    test('should set sortBy to amount', () => {
        const state = filtersReducer(undefined, { type: SORT_BY, sortBy: 'amount' });
        expect(state.sortBy).toBe('amount');
    });
    
    test('should set sortBy to date', () => {
        const currentState = {
            text: '',
            sortBy: 'amount',
            startDate: undefined,
            endDate: undefined
        };
        const state = filtersReducer(currentState, { type: SORT_BY, sortBy: 'date' });
        expect(state.sortBy).toBe('date');
    });
    
    test('should set text filter', () => {
        const state = filtersReducer(undefined, { type: SET_TEXT_FILTER, text: 'something' });
        expect(state.text).toBe('something');
    });
    
    test('should set startDate filter', () => {
        const startDate = moment();
        const state = filtersReducer(undefined, { type: SET_START_DATE, startDate });
        expect(state.startDate).toEqual(startDate);
    });
    
    test('should set endDate filter', () => {
        const endDate = moment();
        const state = filtersReducer(undefined, { type: SET_END_DATE, endDate });
        expect(state.endDate).toEqual(endDate);
    });
});
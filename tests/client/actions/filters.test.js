// =========================================
// FILTERS ACTION TEST =====================
// =========================================
import moment from 'moment';
import {
    SET_TEXT_FILTER,
    setTextFilter,
    SORT_BY,
    sortByDate,
    sortByAmount,
    SET_START_DATE,
    setStartDate,
    SET_END_DATE,
    setEndDate
} from '../../../src/actions/filters';

describe('my filter actions', () => {
    test('should generate set start date action object', () => {
        expect(setStartDate(moment(0))).toEqual({
            type: SET_START_DATE,
            startDate: moment(0)
        });
    });
    
    test('should generate set end date action object', () => {
        expect(setEndDate(moment(0))).toEqual({
            type: SET_END_DATE,
            endDate: moment(0)
        });
    });
    
    test('should generate sort by amount action object', () => {
        expect(sortByAmount()).toEqual({
            type: SORT_BY,
            sortBy: 'amount'
        });
    });
    
    test('should generate sort by date action object', () => {
        expect(sortByDate()).toEqual({
            type: SORT_BY,
            sortBy: 'date'
        });
    });
    
    test('should generate set text filter action object with default values', () => {
        expect(setTextFilter()).toEqual({
            type: SET_TEXT_FILTER,
            text: ''
        });
    });
    
    test('should generate set text filter action object with provided values', () => {
        const text = 'foobar';
        expect(setTextFilter(text)).toEqual({
            type: SET_TEXT_FILTER,
            text
        });
    });
});

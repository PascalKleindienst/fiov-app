// ==============================================
// FILTERS REDUCERS =============================
// ==============================================
import moment from 'moment';
import { SET_TEXT_FILTER, SORT_BY, SET_START_DATE, SET_END_DATE } from '../actions/filters';

// Filters Reducer Default State
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
    case SET_TEXT_FILTER:
        return {
            ...state,
            text: action.text
        };
    case SORT_BY:
        return {
            ...state,
            sortBy: action.sortBy
        };
    case SET_START_DATE:
        return {
            ...state,
            startDate: action.startDate
        };
    case SET_END_DATE:
        return {
            ...state,
            endDate: action.endDate
        };
    default:
        return state;
    }
};

// =========================================
// FILTERS ACTIONS =========================
// =========================================

// =============== Text Filter ===============
export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const setTextFilter = (text = '') => ({
    type: SET_TEXT_FILTER,
    text
});

// =============== Sort By Date Filter ===============
export const SORT_BY = 'SORT_BY';
export const sortByDate = () => ({
    type: SORT_BY,
    sortBy: 'date'
});

// =============== Sort By Amount Filter ===============
export const sortByAmount = () => ({
    type: SORT_BY,
    sortBy: 'amount'
});

// =============== Start Date Filter ===============
export const SET_START_DATE = 'SET_START_DATE';
export const setStartDate = (startDate) => ({
    type: SET_START_DATE,
    startDate
});

// =============== End Date Filter ===============
export const SET_END_DATE = 'SET_END_DATE';
export const setEndDate = (endDate) => ({
    type: SET_END_DATE,
    endDate
});

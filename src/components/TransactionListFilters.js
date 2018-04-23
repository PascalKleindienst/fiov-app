// ==============================================
// TRANSACTION LIST FILTERS COMPONENT ===========
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';

export class TransactionListFilters extends React.Component {
    state = {
        calendarFocused: null
    };

    /**
     * Set start and enddate
     */
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    /**
     * Set calanderFocus
     */
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    /**
     * Set text filter
     */
    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    }

    /**
     * Sort by amount or date
     */
    onSortChange = (e) => {
        if (e.target.value === 'amount') {
            this.props.sortByAmount();
        } else if (e.target.value === 'date') {
            this.props.sortByDate();
        }
    }

    /**
     * Pass props
     */
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            type="text"
                            className="form-field"
                            placeholder="Search Expenses"
                            value={this.props.filters.text}
                            onChange={this.onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            name="sortBy"
                            className="form-field form-field--dropdown"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}
                        >
                            <option value="date">{ this.props.translate('transactions.date') }</option>
                            <option value="amount">{ this.props.translate('transactions.amount') }</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            startDateId="filterStartDate"
                            endDate={this.props.filters.endDate}
                            endDateId="filterEndDate"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// State
const mapStateToProps = (state) => ({
    filters: state.filters,
    translate: getTranslate(state.locale)
});

// Dispatch filters
const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
});

// PropTypes
TransactionListFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    setTextFilter: PropTypes.func.isRequired,
    sortByDate: PropTypes.func.isRequired,
    sortByAmount: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    setEndDate: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListFilters);
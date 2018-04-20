// ==============================================
// TRANSACTION FORM COMPONENT ===================
// ==============================================
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { localize } from 'react-localize-redux';

export class TransactionForm extends React.Component {
    /**
     * Init State with props
     * @param {object} props 
     */
    constructor(props) {
        super(props);

        this.state =  {
            description: props.transaction ? props.transaction.description : '',
            note: props.transaction ? props.transaction.note : '',
            amount: props.transaction ? (props.transaction.amount / 100).toString() : '',
            createdAt: props.transaction ? moment(props.transaction.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }

    /**
     * Set description state
     */
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    /**
     * Set note state
     */
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    /**
     * Set amount state
     */
    onAmountChange = (e) => {
        const amount = e.target.value;
        
        if (!amount || amount.match(/^-?\d{0,}([\.|,]\d{0,2})?$/g)) {
            this.setState(() => ({ amount }));
        }
    };

    /**
     * Set Date state
     */
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState({ createdAt });
        }
    }
    
    /**
     * Set calendar focus state
     */
    onFocusChange = ({ focused }) => {
        this.setState({ calendarFocused: focused });
    };

    /**
     * Submit the form
     */
    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState({ error: this.props.translate('transactions.form.error') });
        } else {
            // Clear the error
            this.setState({ error: '' });
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount.replace(/,/, '.'), 10) * 100,
                createdAt: this.state.createdAt.format(),
                note: this.state.note,
            });
        }
    }

    /**
     * Render Component
     */
    render() {
        return (
            <form className="form" action="#" onSubmit={this.onSubmit}>
                { this.state.error && <p className="form__error">{this.state.error}</p> }
                <input
                    type="text"
                    className="form-field"
                    placeholder={this.props.translate('transactions.form.description')}
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    type="text"
                    className="form-field"
                    placeholder={this.props.translate('transactions.form.amount')}
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    displayFormat="Do MMMM YYYY"
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <textarea
                    className="form-field form-field--textarea"
                    placeholder={this.props.translate('transactions.form.note')}
                    cols="30"
                    rows="10"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">{ this.props.translate('transactions.form.save') }</button>
                </div>
            </form>
        )
    }
}

// PropTypes
TransactionForm.propTypes = {
    translate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    transaction: PropTypes.object
};

export default localize(TransactionForm, 'locale');

// ==============================================
// TRANSACTIONS SELECTORS TEST ==================
// ==============================================
import selectTransactions from '../../../src/selectors/transactions';
import moment from 'moment';
import transactions from '../fixtures/transactions';

describe('my transactions selector', () => {
    transactions.map((transaction) => {
        transaction.createdAt = moment(transaction.createdAt.replace(/ /g, '-'), 'YYYY-MM-DD'); // fix for depreacted YYYY MM DD format
    });
    
    test('should filter by text value', () => {
        const filters = {
            text: 'e',
            sortBy: 'date',
            startDate: undefined,
            endDate: undefined
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[2], transactions[1] ]);
    });

    test('should filter by startDate', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: moment(0),
            endDate: undefined
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[2], transactions[0] ]);
    });

    test('should filter by endDate', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: undefined,
            endDate:  moment(0).add(2, 'days')
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[0], transactions[1] ]);
    });

    test('should sort by date', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: undefined,
            endDate:  undefined
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[2], transactions[0], transactions[1] ]);
    });

    test('should sort by amount', () => {
        const filters = {
            text: '',
            sortBy: 'amount',
            startDate: undefined,
            endDate:  undefined
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[1], transactions[0], transactions[2] ]);
    });

    test('should not sort if neither amount nor date is specified as sortBy arg', () => {
        const filters = {
            text: '',
            sortBy: 'foo',
            startDate: undefined,
            endDate:  undefined
        };

        const result = selectTransactions(transactions, filters);
        expect(result).toEqual([ transactions[0], transactions[1], transactions[2] ]);
    });
});
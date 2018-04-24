// =========================================
// TRANSACTION TOTAL SELECTOR TEST =========
// =========================================
import getTransactionsTotal from '../../../src/selectors/transactions-total';
import transactions from '../fixtures/transactions';

describe('my transactions total selector', () => {
    test('should return 0 if no expeses', () => {
        const total = getTransactionsTotal([]);
        expect(total).toBe(0);
    });
    test('should correctly add up a single expense', () => {
        const total = getTransactionsTotal([transactions[0]]);
        expect(total).toBe(transactions[0].amount);
    });
    test('should correctly add up multiple transactions', () => {
        const total = getTransactionsTotal(transactions);
        expect(total).toBe(-105199);
    });
});
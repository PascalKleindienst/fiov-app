// ========================================
// ROUTE TEST =============================
// ========================================
import transactions from '../../client/fixtures/transactions';
const SequelizeMock = require('sequelize-mock');
const request = require('supertest');
const controller = require('../../../server/controllers/transactions');
const dbMock = new SequelizeMock();

describe('my transactions controller', () => {
    let req, res, TransactionMock;

    beforeEach(() => {
        transactions.map((transaction) => transaction.updatedAt = transaction.createdAt);

        TransactionMock = dbMock.define('Transactions');
        TransactionMock.$queueResult([
            TransactionMock.build(transactions[0]),
            TransactionMock.build(transactions[1]),
            TransactionMock.build(transactions[2])
        ]);

        req = {
            user: { id: 1 },
            body: {},
            app: { locals: { models: { Transactions: TransactionMock }  } }
        };
        res = { json: jest.fn((data) => JSON.parse(JSON.stringify(data))) };
    });

    test('should return transactions of a user', (done) => {
        controller.list_all_transactions(req, res)
            .then((json) => {
                expect(json).toEqual(transactions);
                done();
            })
            .catch(done);
    });

    test('should create transaction for a user with default values', (done) => {
        controller.create_transaction(req, res)
            .then((json) => {
                expect(json.description).toBe('');
                expect(json.amount).toBe(0);
                expect(json.note).toBe('');
                expect(json.user_id).toBe(req.user.id);
                done();
            })
            .catch(done);
    });

    test('should create transaction for a user', (done) => {
        req.body = { description: 'Some Description', amount: 1 };

        controller.create_transaction(req, res)
            .then((json) => {
                expect(json.description).toBe(req.body.description);
                expect(json.amount).toBe(req.body.amount);
                expect(json.user_id).toBe(req.user.id);
                done();
            })
            .catch(done);
    });

    test('should delete a transaction of a user', (done) => {
        req.params = { id: 1 };
        controller.delete_transaction(req, res)
            .then((json) => {
                expect(json).toBe(true);
                done();
            })
            .catch(done);
    });

    test('should update a transaction of a user', (done) => {
        req.params = { id: 1 };
        controller.update_transaction(req, res)
            .then((json) => {
                expect(json).toBe(true);
                done();
            })
            .catch(done);
    });
});
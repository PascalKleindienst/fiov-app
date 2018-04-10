// ========================================
// ROUTE TEST =============================
// ========================================
import transactions from '../../client/fixtures/transactions';
const request = require('supertest');
const helpers = require('../../helpers');
const controller = require('../../../server/controllers/transactions');

describe('my transactions controller', () => {
    let req, res;
    const rejectCallback = (done) => {
        return jest.fn(() => {
            expect(res.send).toHaveBeenCalledWith('error');
            done();
        });
    };

    beforeEach(() => {
        req = {
            user: { id: 1 },
            body: {},
            app: { locals: { models: {}  } }
        };
        res = {};
    });

    test('should return transactions of a user', (done) => {
        res.json = jest.fn(() => {
            expect(res.json).toHaveBeenCalledWith(transactions);
            done();
        });

        req.app.locals.models.Transactions = { findAll: helpers.resolvePromise(transactions) };

        controller.list_all_transactions(req, res);
    });

    test('should return error message on failure', (done) => {
        res.send = rejectCallback(done);
        req.app.locals.models.Transactions = { findAll: helpers.rejectPromise('error') };

        controller.list_all_transactions(req, res);
    });

    test('should create transaction for a user', (done) => {
        req.body = { description: 'Some Description', amount: 1 };
        res.json = jest.fn(() => {
            expect(res.json).toHaveBeenCalledWith({ ...req.body, note: '', user_id: req.user.id });
            done();
        });

        req.app.locals.models.Transactions = {
            create: helpers.resolvePromise({ get: () => ({ ...req.body, note: '', user_id: req.user.id }) })
        };

        controller.create_transaction(req, res);
    });

    test('should return error message for creating a transaction', (done) => {
        res.send = rejectCallback(done);
        req.app.locals.models.Transactions = { create: helpers.rejectPromise('error') };

        controller.create_transaction(req, res);
    });
});
// ========================================
// ROUTE TEST =============================
// ========================================
import transactions from '../../client/fixtures/transactions';
const request = require('supertest');
const app = require('../../../server/app');

describe('my routes', () => {
    test('should return transactions when user is authenticated', () => {
        app.request.user = { id: 1 };
        app.request.isAuthenticated = jest.fn(() => true);
        app.locals.models.Transactions = {
            findAll: jest.fn((args) => new Promise((resolve, reject) => {
                resolve(transactions);
            }))
        };
        
        return request(app).get('/api/transactions').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toMatch(/json/);
            expect(JSON.parse(response.text)).toEqual(transactions);
        });
    });

    test('should return index.html on default GET request', () => {
        return request(app).get('/some/foo/bar').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toMatch(/html/);
            expect(response.text).toMatchSnapshot();
        });
    });
});
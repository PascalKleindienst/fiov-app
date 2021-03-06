// ==============================================
// BOOTSTRAP TEST ===============================
// ==============================================
// Mocks
import ajax from 'fetchival';
jest.mock('fetchival');
jest.mock('react-dom', (jsx, el) => ({
    render: jest.fn()
}));

// Dependencies
import React from 'react';
import { history } from '../../src/routers/AppRouter';
import renderLoadingPage, { store, renderApp, authenticatedView } from '../../src/bootstrap';
import LoadingPage from '../../src/components/LoadingPage';


describe('my bootstrap setup', () => {

    test('should render app only once', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const ReactDOM = require('react-dom');

        renderApp();
        renderApp();
        expect(ReactDOM.render).toHaveBeenCalledTimes(1);
    });

    test('should render loading page', () => {
        document.body.innerHTML = '<div id="app"></div>';
        const ReactDOM = require('react-dom');

        renderLoadingPage();
        expect(ReactDOM.render).toHaveBeenCalledWith(<LoadingPage />, document.getElementById('app'));
    });

    test('should render authenticated view with redirect', (done) => {
        // Mocks
        history.location.pathname = '/';
        history.push = jest.fn();
        ajax.mockImplementation(() => ({
            get: jest.fn(() => new Promise((resolve, reject) => {
                resolve({
                    id: 1,
                    username: 2
                });
            }))
        }));

        // Test
        authenticatedView()
            .then((user) => { // Load User Auth
                expect(store.getState()).toHaveProperty('auth', user);
            })
            .then(() => { // Load Transactions and redirect to dashboard
                expect(store.getState()).toHaveProperty('transactions');
                expect(history.push).toHaveBeenCalledWith('/dashboard');
                done();
            });
    });

    test('should render authenticated view without redirect', (done) => {
        // Mocks
        history.location.pathname = '/something/else';
        history.push = jest.fn();
        ajax.mockImplementation(() => ({
            get: jest.fn(() => new Promise((resolve, reject) => {
                resolve({
                    id: 1,
                    username: 2
                });
            }))
        }));

        // Test
        authenticatedView()
            .then((user) => {
                expect(store.getState()).toHaveProperty('auth', user);
            })
            .then(() => {
                expect(history.push).not.toHaveBeenCalledWith('/dashboard');
                done();
            });
    });

    test('should not render authenticated view', (done) => {
        // Mocks
        history.push = jest.fn();
        ajax.mockImplementation(() => ({
            get: jest.fn(() => new Promise((resolve, reject) => {
                resolve({ error: 'ERROR' });
            }))
        }));

        // check result
        authenticatedView().then(() => {
            expect(store.getState()).toHaveProperty('auth', {});
            expect(history.push).toHaveBeenCalledWith('/');
            done();
        });
    });
});

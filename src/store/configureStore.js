// ==============================================
// CONFIGURE REDUX STORE ========================
// ==============================================
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { localeReducer } from 'react-localize-redux';
import authReducer from '../reducers/auth';
import transactionsReducer from '../reducers/transactions';
import filtersReducer from '../reducers/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store creation
export default () => {
    const store = createStore(
        combineReducers({
            locale: localeReducer,
            auth: authReducer,
            transactions: transactionsReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

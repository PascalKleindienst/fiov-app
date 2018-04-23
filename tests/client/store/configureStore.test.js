// ==============================================
// CONFIGURE STORE TEST =========================
// ==============================================
import configureStore from '../../../src/store/configureStore';

describe('my store', () => {
    let store;

    beforeEach(() => {
        store = configureStore();
    });

    test('should contain auth reducer', () => {
        expect(store.getState()).toHaveProperty('auth');
    });

    test('should contain locale reducer', () => {
        expect(store.getState()).toHaveProperty('locale');
    });

    test('should contain transactions reducer', () => {
        expect(store.getState()).toHaveProperty('transactions');
    });

    test('should contain filters reducer', () => {
        expect(store.getState()).toHaveProperty('filters');
    });
});

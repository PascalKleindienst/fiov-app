// ==============================================
// HEADER PAGE TEST =============================
// ==============================================
// Mocks
const helpers = require('../../helpers');
import ajax from 'fetchival';
jest.mock('fetchival');

// Dependencies
import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import HeaderContainer, { Header } from '../../../src/components/Header';
import { logout } from '../../../src/actions/auth';

const mockStore = configureMockStore([thunk]);

describe('my header component', () => {
    let wrapper, store;

    beforeEach(() => {
        ajax.mockImplementation(() => ({ get: helpers.resolvePromise({ id: 1 }) }));

        store = mockStore({
            auth: { picture: 'foo.png' },
            locale: { languages: ['en'] }
        });
        
        wrapper = shallow(<HeaderContainer store={store} />);
    });

    test('should render correctly when authenticated', () => {
        const wrapper = shallow(<Header logout={() => {}} auth={ {picture: 'foo.png'} } translate={ (msg) => msg } isAuthenticated={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly when NOT authenticated', () => {
        const wrapper = shallow(<Header logout={() => {}} translate={ (msg) => msg } isAuthenticated={false} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    test('should call logout on button click', () => {
        const logout = jest.fn();
        const wrapper = shallow(<Header logout={logout} auth={ {picture: 'foo.png'} } translate={ (msg) => msg } isAuthenticated={true} />);
        
        wrapper.find('.logout').simulate('click');
        expect(logout).toHaveBeenCalled();
    });

    test('should contain auth information', () => {
        expect(wrapper.props().auth).toEqual({ picture: 'foo.png' });
    });

    test('should logout when button is clicked', () => {
        return store.dispatch(wrapper.props().logout).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({ type: 'LOGOUT' });
        });
    });
});

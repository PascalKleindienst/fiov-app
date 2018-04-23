// =======================================
// FOOTER  TEST ==========================
// =======================================
import React from 'react';
import { shallow } from 'enzyme';
import { Footer, smoothscroll } from '../../../src/components/Footer';

describe('my footer page component', () => {
    let wrapper;

    beforeEach(() => {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        wrapper = shallow(<Footer translate={ (msg) => msg }  />);
    });

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should scroll to top on button click if element is not on top', () => {
        window.scrollTo = jest.fn();
        document.documentElement.scrollTop = 100;
        
        wrapper.find('.scroll-top').simulate('click');
        expect(window.scrollTo).toHaveBeenCalled();
    });

    test('should scroll to top on button click if body is not on top', () => {
        window.scrollTo = jest.fn();
        document.body.scrollTop = 100;
        
        wrapper.find('.scroll-top').simulate('click');
        expect(window.scrollTo).toHaveBeenCalled();
    });

    test('should NOT scroll to top when already at top', () => {
        window.scrollTo = jest.fn();
        
        wrapper.find('.scroll-top').simulate('click');
        expect(window.scrollTo).not.toHaveBeenCalled();
    });
});

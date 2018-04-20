// ==============================================
// DELETETRANSACTIONMODAL PAGE TEST ================
// ==============================================
import React from 'react';
import { shallow } from 'enzyme';
import { DeleteTransactionModal } from '../../../src/components/DeleteTransactionModal';

describe('my delete transaction model component', () => {
    test('should render correctly', () => {
        const props = {
            translate: (msg) => msg,
            isOpen: true,
            handleClose: () => false,
            handleConfirmation: () => false
        }
        const wrapper = shallow(<DeleteTransactionModal {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});
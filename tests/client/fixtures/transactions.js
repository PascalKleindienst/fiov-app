import moment from 'moment';

export default [{
    id: 1,
    description: 'Gum',
    note: '',
    amount: -199,
    createdAt: moment(0).format('YYYY MM DD')
}, {
    id: 2,
    description: 'Rent',
    note: '',
    amount: -109500,
    createdAt: moment(0).subtract(4, 'days').format('YYYY MM DD')
}, {
    id: 3,
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').format('YYYY MM DD')
}];

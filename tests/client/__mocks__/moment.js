const moment = require.requireActual('moment');

const mockMoment = (timestamp = 0, format = 'x') => {
    return moment(timestamp, format);
};

mockMoment.locale = (locale) => {
    return moment.locale(locale);
}

export default mockMoment;
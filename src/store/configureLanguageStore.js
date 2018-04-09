// ==============================================
// CONFIGURE LOCALIZATION STORE =================
// ==============================================
import { initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';
import globalTranslations from '../languages/global.json';
import numeral from 'numeral';
import 'numeral/locales/de';

// Init Languages
export default (store) => {
    store.dispatch(initialize(['en', 'de']));
    store.dispatch(addTranslation(globalTranslations, { defaultLanguage: 'en' }));
    store.dispatch(setActiveLanguage('de'));
    numeral.locale('de');

    return store;
};

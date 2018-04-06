// ==============================================
// CONFIGURE LOCALIZATION STORE =================
// ==============================================
import { initialize, addTranslation, setActiveLanguage } from 'react-localize-redux';
import globalTranslations from '../languages/global.json';

// Init Languages
export default (store) => {
    store.dispatch(initialize(['en', 'de']));
    store.dispatch(addTranslation(globalTranslations, { defaultLanguage: 'en' }));
    store.dispatch(setActiveLanguage('de'));

    return store;
};

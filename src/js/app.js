import onChange from 'on-change';
import render from './view.js';
import setControls from './controls.js';
import i18next from 'i18next';
import ru from '../locales/ru.js';

export default () => {
    // activate i18n
    const i18nInstance = i18next.createInstance();
    i18nInstance.init({
        lng: 'ru',
        debug: false,
        resources: {
          ru,
        },
      },
    ).then(() => {
        
        // create proxy state
    const state = onChange({
        formRss: {
            valid: false,
            posts: [],
            fids: [],
            errors: [],
        }
    }, () => {render(state, i18nInstance)});

    // add ALL events
    setControls(state, i18nInstance);
    });

    
}
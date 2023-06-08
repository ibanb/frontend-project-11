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
        
        // set lang to interface
        window.document.querySelector('.display-3').textContent = i18nInstance.t('name');
        window.document.querySelector('p[class="lead"]').textContent = i18nInstance.t('lead');
        window.document.querySelector('label[for="url-input"]').textContent = i18nInstance.t('label');
        window.document.querySelector('.text-muted').textContent = i18nInstance.t('example');
        window.document.querySelector('button[type="submit"]').textContent = i18nInstance.t('add');
        // create proxy state
        const state = onChange({
            formRss: {
                valid: false,
                posts: [],
                feeds: [],
                errors: [],
                genID: 1,
                timer: null,
            }
        }, () => {render(state, i18nInstance)});

    // add ALL events
    setControls(state, i18nInstance);
    });

    
}
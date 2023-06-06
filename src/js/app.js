import onChange from 'on-change';
import render from './view.js';
import setControls from './controls.js';
import i18n from 'i18next';
import ru from '../locales/ru.js';

export default async () => {
    // activate i18n
    const i18nInstance = i18n.createInstance();
    await i18nInstance.init({
        lng: 'ru',
        debug: false,
        resources: {
          ru,
        },
      },
    );

    // create proxy state
    const state = onChange({
        formRss: {
            valid: false,
            posts: [],
            fids: [],
            errors: [],
        }
    }, () => {render(state)});

    // add ALL events
    setControls(state);
}
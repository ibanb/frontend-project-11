import { object, string, number, date, setLocale} from 'yup';
import _ from 'lodash';
import axios from 'axios';

setLocale({

    // use constant translation keys for messages without values
    mixed: {
        default: 'hasStateFid',
      },
    // use functions to generate an error object that includes the value from the schema
    string: {
      url: ({ url }) => ({ key: 'errUrl', values: { url } }),
    },
});

const schema = object({
    value: string().url(),
});



export default (state, i18nInstance) => {

    window.document.querySelector('.display-3').textContent = i18nInstance.t('name');
    window.document.querySelector('p[class="lead"]').textContent = i18nInstance.t('lead');
    window.document.querySelector('label[for="url-input"]').textContent = i18nInstance.t('label');
    window.document.querySelector('.text-muted').textContent = i18nInstance.t('example');
    window.document.querySelector('button[type="submit"]').textContent = i18nInstance.t('add');

    const form = window.document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const value = formData.get('url');
        const forCheck = {value};
        
        
        schema.validate(forCheck)
            .then(result => {

                // axios.get('https://lorem-rss.hexlet.app/feed?unit=second')
                //     .then((result) => {
                //         const parser = new DOMParser();
                //         const rss = parser.parseFromString(result.data, 'text/html');
                //         console.log(rss);
                //     });


                const {value: fid} = result;
                const rssFormState = _.cloneDeep(state.formRss);
                const hasStateFid = rssFormState.fids.includes(fid) ? true : false;

                if (!hasStateFid) {
                    rssFormState.fids.push(fid);
                    rssFormState.errors = [];
                    rssFormState.valid = true;

                    state.formRss = rssFormState;
                    return fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=https://lorem-rss.hexlet.app/feed?unit=second`);
                } else {
                    throw new Error('hasStateFid');
                }
            })
            .then(response => {
                if (response.ok) return response.json()
                throw new Error('network_fail')
            })
            .then(data => {
            
                const parser = new window.DOMParser();
                const rss = parser.parseFromString(data.contents, 'text/html');
                console.log(rss);
                    
            })
            .catch(err => {

                const rssFormState = _.cloneDeep(state.formRss);
                rssFormState.valid = false;

                if (err.message === "hasStateFid") {
                    rssFormState.errors = [i18nInstance.t(err.message)];
                } else if (err.message === "network_fail") {
                    rssFormState.errors = [i18nInstance.t(err.message)];
                } else {
                    const messages = err.errors.map((err) => i18nInstance.t(err.key));
                    rssFormState.errors = [...messages];
                }

                state.formRss = rssFormState;
            });

    });
}
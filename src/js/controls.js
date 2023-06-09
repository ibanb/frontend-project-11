import { object, string, number, date, setLocale} from 'yup';
import _ from 'lodash';
import { getFeedContent } from './helpers.js';
import updateFeeds from './updateFeeds.js';


setLocale({

    // use constant translation keys for messages without values
    mixed: {
        default: 'hasStateFid',
      },
    // use functions to generate an error object that includes the value from the schema
    string: {
      url: ({ url }) => ({ key: 'errUrl', values: { url } }),
      string: ({ string }) => ({ key: 'empty', values: { string }}),
    },
});

const schema = object({
    value: string().url(),
});

export default (state, i18nInstance) => {

    let feed;

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

                const {value} = result;
                feed = value;
                const feeds = state.formRss.feeds;
                // function check includes bu value
                if (feeds.length === 0 || !feeds.map(feed => feed.url).includes(feed)) {
                    return fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${feed}`);
                } else {
                    throw new Error('hasStateFid');
                }

            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('network_fail')
            })
            .then(data => {
                // preparing data to update state
                const url = data.status.url;
                const parser = new window.DOMParser();
                const html = parser.parseFromString(data.contents, 'text/html');
                // check rigth RSS
                if (!html.querySelector('rss')) {
                    throw new Error('rss_fail')
                } else {
                    const formRssCopy = _.cloneDeep(state.formRss);
                    const feedID = formRssCopy.genID + 1;
                    const postID = formRssCopy.genPostID;
                    const {title, descr, posts, newPostID} = getFeedContent(html, postID);
                    // create copy prop for state update
                    formRssCopy.errors = [];
                    formRssCopy.valid = true;
                    formRssCopy.genID += 1;
                    formRssCopy.genPostID = newPostID;
                    formRssCopy.feeds.push({id: feedID, title, descr, url: feed});
                    formRssCopy.posts = [...formRssCopy.posts, ...posts];
                    if (formRssCopy.timer === null) {
                        formRssCopy.timer = setTimeout(updateFeeds, 5000, state);
                    }
                    // STATE UPDATE
                    state.formRss = formRssCopy;
                }
    
            })
            .catch(err => {

                const rssFormState = _.cloneDeep(state.formRss);
                rssFormState.valid = false;

                if (err.message === "hasStateFid") {
                    rssFormState.errors = [i18nInstance.t(err.message)];
                } else if (err.message === "network_fail") {
                    rssFormState.errors = [i18nInstance.t(err.message)];
                } else if (err.message === "rss_fail") {
                    rssFormState.errors = [i18nInstance.t(err.message)];
                } else if (err.message === 'Failed to fetch') {
                    rssFormState.errors = [i18nInstance.t('ERR_NAME_NOT_RESOLVED')];
                } else {

                    // SEE HERE
                    // USE CONSOLE
                    // TRY MEN
                    console.log(err);
                    const messages = err.errors.map((err) => i18nInstance.t(err.key));
                    rssFormState.errors = [...messages];
                }
                
                // STATE UPDATE 
                state.formRss = rssFormState;
            });

    });
}
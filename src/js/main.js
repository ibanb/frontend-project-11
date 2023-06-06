// Import our custom CSS
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import { object, string, number, date} from 'yup';
import _ from 'lodash';
// import watchedState from './view.js';


const state = {
    formRss: {
        valid: false,
        posts: [],
        fids: [],
        errors: [],
    }
};

const watchedState = onChange(state, () => {

    console.log('==== RENDER ====');
    console.log(`valid - ${watchedState.formRss.valid}`);
    console.log(`fids - ${watchedState.formRss.fids}`);
    console.log(`errors - ${watchedState.formRss.errors}`);

    
    const inputRSS = window.document.querySelector('[name="url"]');

    if (!watchedState.formRss.valid) {
        inputRSS.classList.add('is-invalid');
    }

    if (watchedState.formRss.valid) {
        inputRSS.classList.remove('is-invalid');
        form.reset();
    }
})

// add event
const form = window.document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const value = formData.get('url');
    const forCheck = {value};
    const schema = object({
        value: string().url(),
    });
    
    schema.validate(forCheck)
        .then(result => {
            const {value: fid} = result;
            const rssFormState = _.cloneDeep(watchedState.formRss);
            const hasStateFid = rssFormState.fids.includes(fid) ? true : false;

            if (!hasStateFid) {
                rssFormState.fids.push(fid);
                rssFormState.errors = [];
                rssFormState.valid = true;

                watchedState.formRss = rssFormState;
            } else {
                throw new Error('hasStateFid');
            }
        })
        .catch(err => {
            const rssFormState = _.cloneDeep(watchedState.formRss);
            rssFormState.errors = [];
            rssFormState.errors.push(err.message);
            rssFormState.valid = false;
            watchedState.formRss = rssFormState;
        });

})

watchedState.formRss.valid = true;


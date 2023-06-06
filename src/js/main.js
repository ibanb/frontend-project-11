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
    console.log('render');
    console.log(state.formRss.fids)

    const form = window.document.querySelector('form');
    const inputRSS = window.document.querySelector('[name="url"]');
    const formValid = watchedState.formRss.valid;

    console.log(inputRSS);

    if (!formValid) {
        inputRSS.classList.add('is-invalid');
        inputRSS.value = '';
    }

    if (formValid) {
        inputRSS.classList.remove('is-invalid');
        inputRSS.value = '';
    }

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

                if (hasStateFid) {
                    throw new Error('hasStateFid');
                }

                // create new state prop
                rssFormState.fids.push(fid);
                rssFormState.valid = true;
                watchedState.formRss = rssFormState;
                
            })
            .catch(err => {
                console.log(err.message);
                watchedState.formRss.valid = false;
            });

    })
})

// init callback
watchedState.formRss.valid = true;


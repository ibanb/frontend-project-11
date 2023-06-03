// Import our custom CSS
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import watchedState from './view.js';


const state = {
    formRss: {
        valid: false,
        posts: [],
        fids: [],
        errors: [],
    }
};

const model = watchedState(state);

// init callback
model.formRss.valid = true;


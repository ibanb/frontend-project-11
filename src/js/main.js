// Import our custom CSS
import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import onChange from 'on-change';
import render from './view.js';
import setControls from './controls.js';

// create proxy state
const state = onChange({
    formRss: {
        valid: false,
        posts: [],
        fids: [],
        errors: [],
    }
}, () => {render(state)});

// add events
setControls(state);



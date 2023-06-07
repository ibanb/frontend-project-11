

export default (state, i18nInstance) => {

    console.log('==== RENDER ====');
    console.log(`valid - ${state.formRss.valid}`);
    console.log(`feeds - ${JSON.stringify(state.formRss.feeds)}`);
    console.log(`errors - ${JSON.stringify(state.formRss.errors)}`);
    console.log(`posts:`);
    console.log(JSON.stringify(state.formRss.posts));

    // get active elements
    const inputRSS = window.document.querySelector('[name="url"]');
    const form = window.document.querySelector('form');
    
    // toggle border
    if (!state.formRss.valid) {
        inputRSS.classList.add('is-invalid');
    }

    if (state.formRss.valid) {
        inputRSS.classList.remove('is-invalid');
        form.reset()
    }
}
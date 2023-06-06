

export default (state, i18nInstance) => {

    console.log('==== RENDER ====');
    console.log(`valid - ${state.formRss.valid}`);
    console.log(`fids - ${state.formRss.fids}`);
    console.log(`errors - ${state.formRss.errors}`);

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
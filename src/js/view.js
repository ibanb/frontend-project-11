
export default (state) => {

    console.log('==== RENDER ====');
    console.log(`valid - ${state.formRss.valid}`);
    console.log(`fids - ${state.formRss.fids}`);
    console.log(`errors - ${state.formRss.errors}`);

    
    const inputRSS = window.document.querySelector('[name="url"]');

    if (!state.formRss.valid) {
        inputRSS.classList.add('is-invalid');
    }

    if (state.formRss.valid) {
        inputRSS.classList.remove('is-invalid');
        form.reset();
    }
}
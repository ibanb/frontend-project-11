
export default (state) => {

    console.log('==== RENDER ====');
    console.log(`valid - ${state.formRss.valid}`);
    console.log(`fids - ${state.formRss.fids}`);
    console.log(`errors - ${state.formRss.errors}`);

    // get active elements
    const inputRSS = window.document.querySelector('[name="url"]');
    const form = window.document.querySelector('form');

    // use i18n
    window.document.querySelector('h1[class="display-3"]').textContent = i18nInstance.t('name');
    window.document.querySelector('p[class="lead"]').textContent = i18nInstance.t('lead');
    window.document.querySelector('label[for="url-input"]').textContent = i18nInstance.t('label');
    window.document.querySelector('p[class="text-muted"]').textContent = i18nInstance.t('example');
    window.document.querySelector('button[type="submit"]').textContent = i18nInstance.t('add');


    if (!state.formRss.valid) {
        inputRSS.classList.add('is-invalid');
    }

    if (state.formRss.valid) {
        inputRSS.classList.remove('is-invalid');
        form.reset();
    }
}
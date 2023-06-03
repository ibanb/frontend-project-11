import onChange from 'on-change';

export default (state) => {
    return onChange(state, () => {
        const inputRSS = window.document.querySelector('[name="url"]');
        const submit = window.document.querySelector('[type="submit"]');
        submit.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('test');
});

    })
}
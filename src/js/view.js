import onChange from 'on-change';
import yup from 'yup';

export default (state) => {
    return onChange(state, () => {
        console.log('render');

        const form = window.document.querySelector('form');
        const inputRSS = window.document.querySelector('[name="url"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const value = formData.get('url');
            const schema = yup.string().url();
            schema.validate(value)
                .then(fid => {
                    const fids = state.formRss.fids
                    const hasStateFid = fids.includes(fid) ? true : false;

                    if (hasStateFid) {
                        return;
                    }

                    state.formRss.fids.push(fid)

                })
                .catch(err => {
                    console.log('ERROR');
                });

        })
    })
}
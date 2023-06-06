import onChange from 'on-change';
import { object, string, number, date} from 'yup';

export default (state) => {
    return onChange(state, () => {
        console.log('render');
        console.log(state.formRss.fids)

        const form = window.document.querySelector('form');
        const inputRSS = window.document.querySelector('[name="url"]');
        const formValid = state.formRss.valid;

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
                    console.log(fid);
                    const fids = watchedState.formRss.fids
                    const hasStateFid = fids.includes(fid) ? true : false;
                    console.log(`hasStateFid - ${hasStateFid}`);

                    if (hasStateFid) {
                        throw new Error('ERROR on THROW');
                    }

                    console.log(`url = ${fid}`);    
                    watchedState.formRss.fids.push(fid);
                    watchedState.formRss.valid = true;
                    console.log(`fids = ${fids}`);
                })
                .catch(err => {
                    console.log('ERROR');
                    watchedState.formRss.valid = false;
                });

        })
    })
}
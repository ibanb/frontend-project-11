import onChange from 'on-change';
import { object, string, number, date} from 'yup';

export default (state) => {
    return onChange(state, () => {
        console.log('render');
        console.log(state.formRss.fids)

        const form = window.document.querySelector('form');
        const inputRSS = window.document.querySelector('[name="url"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const value = formData.get('url');
            const forCheck = {value};
            const schema = object({
                value: string().url(),
            });
            
            schema.validate(forCheck)
                .then(fid => {
                    console.log(fid);
                    // const fids = state.formRss.fids
                    // const hasStateFid = fids.includes(fid) ? true : false;
                    // console.log(`hasStateFid - ${hasStateFid}`);

                    // if (!hasStateFid) {
                    //     console.log(`url = ${fid}`);
                        
                    //     state.formRss.fids.push(fid);
                    //     console.log(`fids = ${fids}`);
                    // }
                })
                .catch(err => {
                    console.log('ERROR');
                });

        })
    })
}
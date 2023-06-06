import { object, string, number, date} from 'yup';
import _ from 'lodash';

export default (state) => {
    const form = window.document.querySelector('form');
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
                const rssFormState = _.cloneDeep(state.formRss);
                const hasStateFid = rssFormState.fids.includes(fid) ? true : false;

                if (!hasStateFid) {
                    rssFormState.fids.push(fid);
                    rssFormState.errors = [];
                    rssFormState.valid = true;

                    state.formRss = rssFormState;
                } else {
                    throw new Error('hasStateFid');
                }
            })
            .catch(err => {
                const rssFormState = _.cloneDeep(state.formRss);
                rssFormState.errors = [];
                rssFormState.errors.push(err.message);
                rssFormState.valid = false;
                state.formRss = rssFormState;
            });

    });
}
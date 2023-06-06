import { setLocale } from 'yup';
import yup from 'yup';
import i18next from 'i18next';
import ru from './src/locales/ru.js';

const fn = () => {

    const i18nInstance = i18next.createInstance();
    i18nInstance.init({
        lng: 'ru',
        debug: false,
        resources: {
          ru,
        },
      },
    ).then((f) => {
        let schema = yup.object().shape({
            name: yup.string(),
            age: yup.number().min(18),
        });

        return schema.validate({ name: 'jimmy', age: 11 });
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        let messages = err.errors.map((err) => i18nInstance.t(err.key));
        console.log(messages);
    });

    setLocale({
        // use constant translation keys for messages without values
        mixed: {
          default: 'field_invalid',
        },
        // use functions to generate an error object that includes the value from the schema
        number: {
          min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
          max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
        },
    });
};

fn();


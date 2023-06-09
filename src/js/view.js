import { createPostsList, createFeedsList } from './helpers.js';

export default function render(state, i18nInstance) {

    // get active elements
    const feedsContainer = window.document.querySelector('.feeds');
    const postsContainer = window.document.querySelector('.posts');
    const inputRSS = window.document.querySelector('[name="url"]');
    const form = window.document.querySelector('form');
    const errorBox = document.querySelector('.feedback');
    const error = state.formRss.errors[0];
    const {feeds, posts, timer} = state.formRss;
    const contentForFeedsContainer = createFeedsList(feeds);
    const contentForPostsContainer = createPostsList(posts);

    // toggle border (show error message box )
    if (!state.formRss.valid) {
        inputRSS.classList.add('is-invalid');
        errorBox.classList.remove('text-success');
        errorBox.classList.add('text-danger');
        errorBox.textContent = error;
    }

    if (state.formRss.valid) {
        inputRSS.classList.remove('is-invalid');
        errorBox.textContent = i18nInstance.t('done');
        errorBox.classList.remove('text-danger');
        errorBox.classList.add('text-success');
        feedsContainer.innerHTML = contentForFeedsContainer;
        postsContainer.innerHTML = '';
        postsContainer.append(contentForPostsContainer);
        form.reset()
    }
}
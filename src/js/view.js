

export default (state, i18nInstance) => {

    // show state
    console.log('==== RENDER ====');
    console.log(`valid - ${state.formRss.valid}`);
    console.log(`feeds - ${JSON.stringify(state.formRss.feeds)}`);
    console.log(`errors - ${JSON.stringify(state.formRss.errors)}`);
    console.log(`posts - ${JSON.stringify(state.formRss.posts)}`);

    // get active elements
    const feedsContainer = window.document.querySelector('.feeds');
    const postsContainer = window.document.querySelector('.posts');
    const inputRSS = window.document.querySelector('[name="url"]');
    const form = window.document.querySelector('form');
    const errorBox = document.querySelector('.feedback');
    const error = state.formRss.errors[0];
    const {feeds, posts} = state.formRss;

    // feeds container content
    const contentForFeedsContainer = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Фиды</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${feeds.map(feed => {
            return `<li class="list-group-item border-0 border-end-0">
                        <h3 class="h6 m-0">${feed.title}</h3>
                        <p class="m-0 small text-black-50">${feed.descr}</p>
                    </li>`;
        }).join('')}
      </ul>
    </div>
    `;

    const contentForPostsContainer = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Фиды</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${posts.map(post => {
            return `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                        <a href="${post.link}" class="fw-bold" data-id="2" target="_blank" rel="noopener noreferrer">${post.title}</a>
                        <button type="button" class="btn btn-outline-primary btn-sm" data-id="2" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
                    </li>`;
        }).join('')}
      </ul>
    </div>
    `;

    // posts container content

    
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
        postsContainer.innerHTML = contentForPostsContainer;
        form.reset()
    }
}

const getFeedContent = (html, id) => {

    const title = html.querySelector('channel > title').textContent;
    const descr = html.querySelector('channel > description').textContent;
    const posts = [...html.querySelectorAll('item')]
        .map(post => {
            const postID = id;
            const title = post.querySelector('title').textContent;
            const descr = post.querySelector('description').textContent;
            const link = post.querySelector('link').nextSibling.textContent;

            return {postID, title, descr, link};
        });

    return { 
        title,
        descr, 
        posts 
    };
};

const createFeedsList = (feeds) => {
    return `
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
};

const createPostsList = (posts) => {
    return `
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
};

const getID = (state, key) => {
  const { feeds } = state.formRss;
  const findNeedFeed = feeds.filter(feed => feed.url === key);
  return findNeedFeed[0].id;
}


export { getFeedContent, createFeedsList, createPostsList, getID };
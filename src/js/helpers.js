import getFeedContent from "./helpers/getFeedContent.js";
import showModal from './helpers/showModal.js';

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

const createPostsList = (state, posts, i18nInstance) => {

    // console.log('state in createPostsList');
    // console.log(JSON.stringify(state, ' ', 2));
    const cardBorder = window.document.createElement('div');
    cardBorder.classList.add('card', 'border-0');
    const cardBody = window.document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = window.document.createElement('h2');
    cardTitle.classList.add('card-title', 'h4');
    cardTitle.textContent = 'Посты';
    const ul = window.document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    
    
    // create post list
    const newPosts = posts.map(post => {
      
      // create list item
      const li = window.document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      
      // a link
      const a = window.document.createElement('a');
      a.classList.add(`${post.used === true ? 'fw-normal' : 'fw-bold'}`);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.setAttribute('href', post.link);
      a.dataset.feedID = post.id;
      a.textContent = post.title;
      li.append(a);

      // button
      const button = window.document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.dataset.feedID = post.id;
      button.dataset.bsToggle = 'modal';
      button.dataset.bsTarget = '#modal';
      button.textContent = i18nInstance.t('view');
      // console.log('state in map');
      // console.log(JSON.stringify(state, ' ', 2));
      button.addEventListener('click', (event) => showModal(event, state, post.title, post.descr, post.link, post.id));
      li.append(button);

      ul.append(li);

    });

    cardBody.append(cardTitle);
    cardBorder.append(cardBody);
    cardBorder.append(ul);

    return cardBorder;
};

const getFeedID = (state, key) => {
  const { feeds } = state.formRss;
  const findNeedFeed = feeds.filter(feed => feed.url === key);
  return findNeedFeed[0].feedID;
}

const comparePosts = (newPosts, oldPosts) => {

  const oldPostsTitles = oldPosts.map(oldpost => oldpost.title);
  const diff = newPosts.filter(post => oldPostsTitles.includes(post.title) === false);
  if (diff) {
    return [...oldPosts, ...diff];
  }
  return oldPosts;
}


export { getFeedContent, createFeedsList, createPostsList, getFeedID, comparePosts, showModal };

const getFeedContent = (html, feedID, postID) => {
    
    const title = html.querySelector('channel > title').textContent;
    const descr = html.querySelector('channel > description').textContent;
    const posts = [...html.querySelectorAll('item')]
        .map(post => {

            const id = postID;
            console.log(`id = ${id}`)
            postID += 1;
            console.log(`postID = ${postID}`);
            const title = post.querySelector('title').textContent;
            const descr = post.querySelector('description').textContent;
            const link = post.querySelector('link').nextSibling.textContent;
            const used = false;

            return {feedID, id, title, descr, link, used};
        });

    return { 
        title,
        descr, 
        posts,
        newPostID: postID, 
    };
};

function showModal (title, descr, link) {

  // const modal = window.document.querySelector('#modal');
  // const header = modal.querySelector('.modal-title');
  // const body = modal.querySelector('.modal-body');
  // const href = modal.querySelector('.modal-footer > a');
  // const namePostLink = event.closest('li > a');
  // namePostLink.classList.remove('fw-bold');
  // namePostLink.classList.add('fw-normal');

  console.log('I am in showmodal')
  // console.log(`title - ${title}`);
  // console.log(`descr - ${descr}`);
  // console.log(`link - ${link}`);
  // console.log(`event - ${event.target}`);

  // header.textContent = title;
  // body.textContent = descr;
  // href.setAttribute('href', link);

} 

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
      a.classList.add('fw-bold');
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
      button.value = 'Просмотр';
      button.addEventListener('click', () => console.log('test!!!'));
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
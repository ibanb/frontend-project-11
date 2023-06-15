
export default function showModal (event, state, title, descr, link, id) {

    const modal = window.document.querySelector('#modal');
    const header = modal.querySelector('.modal-title');
    const body = modal.querySelector('.modal-body');
    const href = modal.querySelector('.modal-footer > a');
  
    header.textContent = title;
    body.textContent = descr;
    href.setAttribute('href', link);
  
    // console.log('before cloneDeep');
    // console.log(JSON.stringify(state, ' ', 2));
  
    const copyFormRss = _.cloneDeep(state.formRss);
    // console.log('copy of formRss');
    // console.log(JSON.stringify(copyFormRss, ' ', 2));
    const { posts: copyPosts } = copyFormRss;
    // console.log(copyPosts);
    const newPosts = copyPosts.map(post => {
      if (post.id === id) {
        return {...post, used: true};
      } else {
        return post;
      }
    });
    // console.log('after cloneDeep');
    // console.log(JSON.stringify(state.formRss, ' ', 2));
    state.formRss.posts = newPosts;
  
};

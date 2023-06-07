
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


export { getFeedContent };
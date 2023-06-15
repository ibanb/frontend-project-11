export default function getFeedContent(html, postID) {
    
    const title = html.querySelector('channel > title').textContent;
    const descr = html.querySelector('channel > description').textContent;
    const posts = [...html.querySelectorAll('item')]
        .map(post => {

            const id = postID;
            postID += 1;
            const title = post.querySelector('title').textContent;
            const descr = post.querySelector('description').textContent;
            const link = post.querySelector('link').nextSibling.textContent;
            const used = false;

            return {id, title, descr, link, used};
        });

    return { 
        title,
        descr, 
        posts,
        newPostID: postID, 
    };
};
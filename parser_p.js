// import axios from 'axios';


// const test = () => {
//     axios.get('https://lorem-rss.hexlet.app/feed?unit=second')
//         .then((result) => {
//             const parser = new DOMParser();
//             const rss = parser.parseFromString(result.data, 'text/html');
//             console.log(rss);
//         });
// }

// test();


// fetch(` https://allorigins.hexlet.app/get?disableCache=true&url=https://lorem-rss.hexlet.app/feed?unit=second`)
//   .then(response => {
//     if (response.ok) return response.json()
//     throw new Error('Network response was not ok.')
//   })
//   .then(data => console.log(data.contents));
fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=https://ru.hexlet.io/lessons.rss`)
    .then(response => {
        if (response.ok) return response.json()
        throw new Error('network_fail')
    })
    .then(data => {
        // preparing data to update state
        // const url = feed;
        // const id = formRssCopy.genID + 1;
        const parser = new window.DOMParser();
        const html = parser.parseFromString(data.contents, 'text/html');

        const title = html.querySelector('channel > title');
        const descr = html.querySelector('channel > description');

        const posts = [...html.querySelectorAll('item')]
            .map(post => {
                const postID = '#';
                const title = post.querySelector('title').textContent;
                const descr = post.querySelector('description').textContent;
                const link = post.querySelector('link').nextSibling.textContent;

                return {postID, title, descr, link};
            });
        console.log(html);
        console.log(title);
        console.log(descr);
        console.log(posts);
    });
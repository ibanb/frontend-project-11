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


fetch(` https://allorigins.hexlet.app/get?disableCache=true&url=https://lorem-rss.hexlet.app/feed?unit=second`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => console.log(data.contents));

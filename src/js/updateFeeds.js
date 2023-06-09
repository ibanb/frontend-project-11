import _ from 'lodash';
import { getFeedContent, getFeedID, comparePosts } from './helpers.js';

export default function updateFeeds(state) {

    const { feeds } = state.formRss;
    // get promises by fetch
    const promises = feeds.map(feed => {
        return fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${feed.url}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('network_fail')
        })
        .then(data => data)
        .catch(err => err.message);

    })

    // get new feeds
    Promise.all(promises)
        .then(coll => {

            const copyFormRss = _.cloneDeep(state.formRss);
            let newPostID = 1;
            // filter only accessible feeds
            let newPosts = [];
            const newFeedsColl = coll
                .filter(feed => feed !== "Failed to fetch")
                .map(feed => {

                    const parser = new window.DOMParser();
                    const html = parser.parseFromString(feed.contents, 'text/html');
                    const url = feed.status.url;
                    const id = getFeedID(state, url);
                    const {posts} = getFeedContent(html, id, newPostID);
                    newPostID += 1;
                    return posts;
                })
                .map(postList => {
                    newPosts = [...newPosts, ...postList];
                })

            // TASK COMPARE OLD & NEW POSTS
            const updatedPosts = comparePosts(newPosts, state.formRss.posts);
            copyFormRss.posts = updatedPosts;
            copyFormRss.genPostID = newPostID;
            // update genPostID

            state.formRss = copyFormRss;
            setTimeout(updateFeeds, 5000, state);


        });

}

const Post = require("./../../models/Post");

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                console.log("posts", posts);
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    }
};
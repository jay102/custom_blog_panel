const Sequelize = require("sequelize");
const db = require("../config/config");

const BlogPost = db.define("blog_post", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    post_url: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
export default BlogPost;
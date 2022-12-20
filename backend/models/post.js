const sql = require("./db");

const Post = function(post) {
  this.title = post.title;
  this.content = post.content;
  this.contentImgUrl = post.contentImgUrl;
  this.userId = post.userId;
  this.readPostId = post.readPostId;
  this.likePostId = post.likePostId;
};

Post.findAll = (result) => {
  sql.query("SELECT * FROM posts", (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }
    console.log("found all posts: ", res);
    result(null, res);
  });
};

Post.findOne = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE post_id = ${ id }`, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }
    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }
    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Post.modifyOne = (id, result) => {
  sql.query(
    "UPDATE posts SET title = ?, content = ?, contentImgUrl = ? WHERE post_id = ?",
    [this.title, this.content, this.contentImgUrl, id],
    (error, res) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("modified post: ", { id: id, ...this.post });
      result(null, { id: id, ...this.post });
    }
  );
};

Post.deleteOne = (id, result) => {
  sql.query("DELETE FROM posts WHERE post_id = ?", id, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Post with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted post: ", id);
    result(null, res);
  });
};

// Post.getReadPosts = (userId, result) => {
//   sql.query("SELECT * FROM readpost WHERE userId = ?", userId, (error, res) => {
//     if (error) {
//       console.log("error: ", error);
//       result(null, error);
//       return;
//     }
//     if(res.length) {
//       console.log("read post");
//       return(null, res);
//     } else {
//       console.log("unread post");
//       return(null, res);
//     }
//   });
// };

// Post.getLikePosts = (userId, result) => {
//   sql.query("SELECT * FROM likepost WHERE userId = ?", userId, (error, res) => {
//     if (error) {
//       console.log("error: ", error);
//       result(null, error);
//       return;
//     }
//     if (res.length) {
//       console.log("like post");
//       result(null, res);
//     } else {
//       console.log("not like post");
//       result(null, res);
//     }
//   });
// };

// how to use data in foreign keys here?
// how to construct the way of getting read & like posts?
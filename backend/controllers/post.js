const { sequelize, Post, ReadPost, LikePost } = require("../models/post");
const fs = require("fs");
const { Sequelize, Op } = require("sequelize");

exports.getAllPosts = (req, res, next) => {
  Post.findAll({ include: [ReadPost, LikePost] }).then(
    (posts) => {
      res.status(200).json(posts)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { post_id: req.params.id },
    include: [ReadPost, LikePost]
  }).then(
    (post) => {
      res.status(200).json(post);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.createPost = (req, res, next) => {
  console.log(req.body);
  const url = req.protocol + "://" + req.get("host");
  let contentImgUrl = "";
  if (req.file) {
    contentImgUrl = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    title: req.body.post.title,
    content: req.body.post.content,
    contentImgUrl,
    userId: req.auth.userId,
    // readPostId: null,
    // likePostId: null
  });
  console.log(post);
  post.save().then(
    () => {
      res.status(201).json({
        message: "Posted successfully!"
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.modifyPost = async (req, res, next) => {
  const targetPost = await Post.findOne({ where: { post_id: req.params.id }});
  let contentImgUrl = targetPost.contentImgUrl;
  if (req.file) {
    contentImgUrl = url + "/images/" + req.file.filename;
  }
  await targetPost.update({
    title: req.body.post.title,
    content: req.body.post.content,
    contentImgUrl,
    userId: req.auth.userId,
  }).then(
    () => {
      res.status(201).json({
        message: "Updated post!"
      });
    }
  ).catch(
    (error) => {
      res.status(403).json({
        error: error
      });
    }
  );
};


// exports.modifyPost = (req, res, next) => {
//   const url = req.protocol + "://" + req.get("host");
//   let contentImgUrl = "";
//   if (req.file) {
//     contentImgUrl = url + "/images/" + req.file.filename;
//   }
//   const post = new Post({
//     post_id: req.params.id,
//     title: req.body.post.title,
//     content: req.body.post.content,
//     contentImgUrl,
//     userId: req.auth.userId,
//   });
//   console.log("post modify: ", post)
//   Post.update(post, { where: { post_id: req.params.id }}).then(
//     () => {
//       res.status(201).json({
//         message: "Modified post!"
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(403).json({
//         error: error
//       });
//     }
//   );
// };

exports.deletePost = async (req, res, next) => {
  const targetPost = await Post.findOne({ where: { post_id: req.params.id }});  // 10=: = gets an error
  if (targetPost.contentImgUrl) {
    const filename = targetPost.contentImgUrl.split("/images/")[1];
    fs.unlink("images/" + filename, (error) => {
      if (error) {
        throw error
      }
    })
  }
  await ReadPost.destroy({ where: { postId: req.params.id }}); // = gets an error
  await LikePost.destroy({ where: { postId: req.params.id }}); // = gets an error
  await targetPost.destroy().then(
    () => {
      res.status(200).json({
        message: "Deleted post!"
      });
    }
  ).catch(
    (error) => {
      res.status(403).json({
        error: error
      });
    }
  );
};

// exports.deletePost = (req, res, next) => {
//   Post.findOne({ where: { post_id: req.params.id }}).then(
//     (post) => {
//       console.log("post ha: ", post);
//       const filename = post.contentImgUrl.split("/posts/")[1];
//       fs.unlink("images/" + filename, () => {
//         Post.destroy({ post_id: req.params.id }).then(
//           () => {
//             res.status(200).json({
//               message: "Deleted post!"
//             });
//           }
//         ).catch(
//           (error) => {
//             res.status(403).json({
//               error: error
//             });
//           }
//         );
//       });
//     }
//   );
// };


exports.readPost = (req, res, next) => {
  const readPost = new ReadPost({
    postId: req.params.id,
    userId: req.body.userId
  });
  sequelize.query("SELECT * FROM posts WHERE post_id IN (SELECT postId FROM readpost WHERE postId = "+req.params.id+" AND userId = "+req.body.userId+")").then(
    ([post, meta]) => {
      console.log(post)
      if (!post.length) {
        readPost.save().then(
          () => {
            res.status(201).json({
              message: "Created ReadPost!"
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// since I set requesting method as POST,
// when deleting the data, it shows an error saying missing attributes of model.destroy

exports.likePost = (req, res, next) => {
  const likePost = new LikePost({
    postId: req.params.id,
    userId: req.body.userId
  });
  sequelize.query("SELECT * FROM posts WHERE post_id IN (SELECT postId FROM likepost WHERE userId = "+req.body.userId+")").then(
    ([post, meta]) => {
      console.log(post)
      if (!post.length) {
        likePost.save().then(
          () => {
            res.status(201).json({
              message: "Created LikePost!"
            });
          }
        )
      } else {
        LikePost.destroy({ post }).then(
          () => {
            res.status(200).json({
              message: "Deleted LikePost!"
            });
          }
        )
      }
    }
  )
};


// when I try the code with getAllPosts (/posts) it works properly, but
// when I try it with getUnreadPosts (/posts/unread) it does not work by returning "null"

exports.getUnreadPosts = async (req, res, next) => {
  const [posts, meta] = await sequelize.query("SELECT * FROM posts WHERE post_id NOT IN (SELECT postId FROM readpost WHERE userId = 17)");
  const unreadPostIds = posts.map(post => post.post_id)
  // console.log(await Post.findAll({
  //   where: { post_id: {[Op.in]: unreadPostIds} },
  //   include: [ ReadPost, LikePost ]
  // }))

  Post.findAll({
    where: { post_id: {[Op.in]: unreadPostIds} },
    include: [ ReadPost, LikePost ]
  }).then(
    (posts) => {
      res.status(200).json(posts)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )

  // const readPosts = await ReadPost.findAll({ where: { userId: 18 }, include: Post});
  // const readPostIds = readPosts.map(post => post.readpost_id) // returns [id, id, id]
  // console.log(readPosts[0].post.title)

  // Post.findAll({ where: { postIds: {[Op.notIn]: readPostIds} }, include: [ReadPost, LikePost]}).then(
  //   (posts) => {
  //     console.log(posts)
  //   }
  // ).catch(
  //   (error) => {
  //     console.log(error)
  //   }
  // )

};


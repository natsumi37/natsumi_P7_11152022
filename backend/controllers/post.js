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

exports.deletePost = async (req, res, next) => {
  const targetPost = await Post.findOne({ where: { post_id: req.params.id }});
  if (targetPost.contentImgUrl) {
    const filename = targetPost.contentImgUrl.split("/images/")[1];
    fs.unlink("images/" + filename, (error) => {
      if (error) {
        throw error
      }
    })
  }
  await ReadPost.destroy({ where: { postId: req.params.id }});
  await LikePost.destroy({ where: { postId: req.params.id }});
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

exports.readPost = async (req, res, next) => {
  const readPostParams = {
    postId: req.params.id,
    userId: req.body.userId
  };
  let readPost = await ReadPost.findOne({ where: readPostParams });
  if (readPost === null) {
    readPost = await ReadPost.create(readPostParams).then(
      () => {
        res.status(201).json({
          message: "Created ReadPost!"
        })
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  }

  // const readPost = new ReadPost({
  //   postId: req.params.id,
  //   userId: req.body.userId
  // });
  // sequelize.query("SELECT * FROM posts WHERE post_id IN (SELECT postId FROM readpost WHERE postId = "+req.params.id+" AND userId = "+req.body.userId+")").then(
  //   ([post, meta]) => {
  //     console.log(post)
  //     if (!post.length) {
  //       readPost.save().then(
  //         () => {
  //           res.status(201).json({
  //             message: "Created ReadPost!"
  //           });
  //         }
  //       ).catch(
  //         (error) => {
  //           res.status(400).json({
  //             error: error
  //           });
  //         }
  //       );
  //     }
  //   }
  // ).catch(
  //   (error) => {
  //     res.status(400).json({
  //       error: error
  //     });
  //   }
  // );
};

exports.likePost = async (req, res, next) => {
  const likePostParams = {
    postId: req.params.id,
    userId: req.body.userId
  };
  let likePost = await LikePost.findOne({ where: likePostParams });
  if (likePost === null) {
    likePost = await LikePost.create(likePostParams).then(
      () => {
        res.status(201).json({
          message: "Created LikePost!"
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  } else {
    await likePost.destroy().then(
      () => {
        res.status(200).json({
          message: "Deleted LikePost!"
        });
      }
    ).catch(
      (error) => {
        res.status(403).json({
          error: error
        });
      }
    );
  }

  //   res.status(204).json({
  //     message: "Deleted LikePost!"
  //   });
  // }

  // const likePost = new LikePost({
  //   postId: req.params.id,
  //   userId: req.body.userId
  // });
  // sequelize.query("SELECT * FROM posts WHERE post_id IN (SELECT postId FROM likepost WHERE userId = "+req.body.userId+")").then(
  //   ([post, meta]) => {
  //     console.log(post)
  //     if (!post.length) {
  //       likePost.save().then(
  //         () => {
  //           res.status(201).json({
  //             message: "Created LikePost!"
  //           });
  //         }
  //       )
  //     } else {
  //       LikePost.destroy({ post }).then(
  //         () => {
  //           res.status(204).json({
  //             message: "Deleted LikePost!"
  //           });
  //         }
  //       )
  //     }
  //   }
  // )
};

exports.getUnreadPosts = async (req, res, next) => {
  const [posts, meta] = await sequelize.query("SELECT * FROM posts WHERE post_id NOT IN (SELECT postId FROM readpost WHERE userId = "+req.params.id+")");
  const unreadPostIds = posts.map(post => post.post_id)
  console.log(unreadPostIds)

  Post.findAll({
    where: { post_id: {[Op.in]: unreadPostIds}, userId: {[Op.ne]: req.params.id} },
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
};


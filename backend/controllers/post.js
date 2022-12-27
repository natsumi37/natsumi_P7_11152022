const Post = require("../models/post");
const fs = ("fs");

exports.getAllPosts = (req, res, next) => {
  console.log("getAllPosts connected!")
  Post.findAll().then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk({ id: req.params.id }).then(
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
  console.log("createPost connected!");
  console.log(req.body.post);
  const url = req.protocol + "://" + req.get("host");
  let contentImgUrl = "";
  if (req.file) {
    contentImgUrl = url + "/images/posts/" + req.file.filename;
  }
  const post = new Post({
    title: req.body.post.title,
    content: req.body.post.content,
    contentImgUrl,
    userId: req.auth.userId,
    readPostId: [],
    likePostId: []
  });
  console.log(post);
  Post.create().then(
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

exports.modifyPost = (req, res, next) => {
  let post = new Post({ post_id: req.params.id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.post = JSON.parse(req.body.post);
    post = {
      post_id: req.params.id,
      title: req.body.post.title,
      content: req.body.post.content,
      contentImgUrl: url + "/images/posts/" + req.file.filename,
      userId: req.body.post.userId,
      readPostId: req.body.post.readPostId,
      likePostId: req.body.post.likePostId
    };
  } else {
    post = {
      post_id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      contentImgUrl: req.body.contentImgUrl,
      userId: req.body.userId,
      readPostId: req.body.readPostId,
      likePostId: req.body.likePostId
    };
  }
  console.log(post)
  Post.update({ post }).then(
    () => {
      res.status(201).json({
        message: "Modified post!"
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

exports.deletePost = (req, res, next) => {
  Post.findByPk({ post_id: req.params.id }).then(
    (post) => {
      const filename = post.contentImgUrl.split("/posts/")[1];
      fs.unlink("images/posts/" + filename, () => {
        Post.destroy({ post_id: req.params.id }).then(
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
      });
    }
  );
};
const User = require("../models/user");
const { ReadPost, LikePost, Post } = require("../models/post");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, Op } = require("sequelize");


exports.signup = (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.user.password, 10).then(
    (hash) => {
      const url = req.protocol + "://" + req.get("host");
      let profilePicUrl = "";
      if (req.file) {
        profilePicUrl = url + "/images/" + req.file.filename
      }
      const user = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: hash,
        profilePicUrl
      });
      console.log(user)
      user.save().then(
        () => {
          res.status(201).json({
            message: "User added!"
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  );
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }).then(
    (user)=> {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!")
        });
      }
      console.log(user);
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          console.log(req.body.password)
          console.log(user.password)
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!")
            });
          }
          const token = jwt.sign(
            { userId: user.user_id },
            "J2dJWCVxyQngXB",
            { expiresIn: "24h" });
          res.status(201).json({
            userId: user.user_id,
            token: token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicUrl: user.profilePicUrl
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
};

exports.delete = async (req, res, next) => {
  console.log(req.params)
  const targetUser = await User.findOne({ where: { user_id: req.params.id }});
  if (targetUser.profilePicUrl) {
    const filename = targetUser.profilePicUrl.split("/images/")[1];
    fs.unlink("images/" + filename, (error) => {
      if (error) {
        throw error
      }
    })
  }
  const findPosts = await Post.findAll({ where: { userId: req.params.id }});
  const userCreatedPosts = findPosts.map(post => post.post_id);
  await ReadPost.destroy({ where: { userId: req.params.id }});
  await ReadPost.destroy({ where: { postId: {[Op.in]: userCreatedPosts} }});
  await LikePost.destroy({ where: { userId: req.params.id }});
  await LikePost.destroy({ where: { postId: {[Op.in]: userCreatedPosts} }});
  await Post.destroy({ where: { userId: req.params.id }});
  await targetUser.destroy().then(
    () => {
      res.status(200).json({
        message: "Deleted user!"
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

exports.getAllUsers = (req, res, next) => {
  User.findAll().then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
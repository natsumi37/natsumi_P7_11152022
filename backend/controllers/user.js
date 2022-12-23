const User = require("../models/user");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      const url = req.protocol + "://" + req.get("host");
      req.body.user = JSON.parse(req.body.user);

      const user = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: hash,
        profilePicUrl: url + "/images/users" + req.file.filename
      });
      console.log(user)
      User.signupUser().then(
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
  User.loginUser({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error("User not found!")
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error("Incorrect password!")
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            "J2dJWCVxyQngXB",
            { expiresIn: "24h" });
          res.status(201).json({
            userId: user._id,
            token: token
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

exports.deleteUser = (req, res, next) => {
  User.removeUser({ _id: req.params.id }).then(
    (user) => {
      const filename = user.profilePicUrl.split("/users/")[1];
      fs.unlink("images/users/" + filename, () => {
        User.delete({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: "User deleted!"
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
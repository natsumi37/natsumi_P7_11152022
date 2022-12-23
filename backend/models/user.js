const sql = require("./db");

const User = function(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.profilePicUrl = user.profilePicUrl;
};

// create a new User
User.signupUser = (newUser) => {
  sql.query("INSERT INTO users SET ?", newUser, (error, res) => {
    if (error) {
      console.log("error: ", error);
      throw error;
    }
    console.log("added user: ", { user_id: res.insertId, ...newUser });
  });
};

//find a User by email
User.loginUser = (userEmail) => {
  sql.query("SELECT * FROM users WHERE email = ?", userEmail, (error, res) => {
    if (error) {
      console.log("error: ", error);
      throw error;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      return;
    }
    // not found User with the email
    console.log({ kind: "not_found" });
  });
};

// delete a User
User.removeUser = (id) => {
  sql.query("DELETE FROM users WHERE user_id = ?", id, (error, res) => {
    if (error) {
      console.log("error: ", error);
      throw error;
    }
    if (!res.length) {
      // not found User with the email
      console.log({ kind: "not_found" });
      return;
    }
    console.log("deleted user: ", id);
  });
};

// get all Users
User.getAllUsers = (result) => {
  sql.query("SELECT * FROM users", (error, res) => {
    if (error) {
      console.log("error: ", error);
      throw error;
    }
    console.log("found all users: ", res);
  });
};

module.exports = User;
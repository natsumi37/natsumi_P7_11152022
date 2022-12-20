const sql = require("./db");

const User = function(user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
  this.profilePicUrl = user.profilePicUrl;
};

// create a new User
User.signupUser = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }
    console.log("added user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

//find a User by email
User.loginUser = (userEmail, result) => {
  sql.query(`SELECT * FROM users WHERE email = ${ userEmail }`, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};

// delete a User
User.deleteUser = (id, result) => {
  sql.query("DELETE FROM users WHERE user_id = ?", id, (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }
    if (!res.length) {
      // not found User with the email
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user: ", id);
    result(null, res);
  });
};

// get all Users
User.getAllUsers = (result) => {
  sql.query("SELECT * FROM users", (error, res) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }
    console.log("found all users: ", res);
    result(null, res);
  });
};

module.exports = User;
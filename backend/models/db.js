const mysql = require("mysql");
const dbConfig = require("../middleware/db-config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  }
  console.log("Connected to database!");
});

// app.get('/', (req, res) => {
//   connection.query(
//     'SELECT * FROM users',
//     (error, results) => {
//       console.log(results);
//       res.render('hello.ejs');
//     }
//   );
// });

module.exports = connection;
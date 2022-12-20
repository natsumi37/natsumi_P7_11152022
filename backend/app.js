const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const path = require("path");

const app = express();

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Groupomania!" })
});


// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/posts", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images/users")));

module.exports = app;
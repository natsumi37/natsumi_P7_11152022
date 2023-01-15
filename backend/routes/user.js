const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCtrl = require("../controllers/user");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.delete);
router.get("/users", auth, userCtrl.getAllUsers);
/* how can I set the url of deleting an account 
 /api/auth/userId?
 /api/posts/userId?
*/

module.exports = router;

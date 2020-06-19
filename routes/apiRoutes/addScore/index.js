const router = require("express").Router();
const { requireAuth } = require("../../../middlewares/authMiddlewares");
const {
  addScore,
  getScore,
} = require("./../../../controllers/questionController");
router.route("/").post(requireAuth, addScore);
router.route("/").get(requireAuth, getScore);
module.exports = router;

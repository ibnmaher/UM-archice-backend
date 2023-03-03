const express = require("express");
const {
  addUser,
  addActivity,
  getNames,
  getActivites,
  deleteActivity,
} = require("../controllers/adminController");

router = express.Router();
router.post("/add-user", addUser);
router.post("/add-activity", addActivity);
router.get("/get-names", getNames);
router.get("/get-activities", getActivites);
router.delete("/delete-activity", deleteActivity);
module.exports = router;

const express = require("express");
const router = express.Router();

const { getAllShoeSales } = require("../controllers/shoeSaleCtrl");

// Route to get all shoe sales
router.get("/", getAllShoeSales);

module.exports = router;

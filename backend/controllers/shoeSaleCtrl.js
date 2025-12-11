// const ShoeSale = require("../models/ShoeSale");
// const mongoose = require("mongoose");
// const asyncHandler = require("express-async-handler");

// const ShoeSaleCtrl = {
//   // Get all shoe sales
//   getAllShoeSales: asyncHandler(async (req, res) => {
//     const shoeSales = await ShoeSale.find();
//     res.status(200).json({
//       message: "Shoe sales fetched successfully",
//       count: shoeSales.length,
//       data: shoeSales,
//     });
//   }),
// };

// module.exports = ShoeSaleCtrl;

const ShoeSale = require("../models/ShoeSale");
const asyncHandler = require("express-async-handler");

exports.getAllShoeSales = asyncHandler(async (req, res) => {
  const shoeSales = await ShoeSale.find();

  res.status(200).json({
    message: "Shoe sales fetched successfully",
    count: shoeSales.length,
    data: shoeSales,
  });
});

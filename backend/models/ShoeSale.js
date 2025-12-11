const mongoose = require("mongoose");

const ShoeSaleSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    shoe_name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sales: { type: Number, required: true },
    ad_cost: { type: Number, required: true },
    impressions: { type: Number, required: true },
    clicks: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShoeSale", ShoeSaleSchema);

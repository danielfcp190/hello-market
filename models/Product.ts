import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // id: { type: String },
  name: { type: String },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

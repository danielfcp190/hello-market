import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Product from "../../models/Product";

// type Data = {
//   name: any[];
// };

const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@cluster0.dsf8k.mongodb.net/products?retryWrites=true&w=majority`
    );
    const products = await Product.find({});

    res.status(200).json(products);

    mongoose.disconnect();
  }

  if (req.method === "PUT") {
    await mongoose.connect(
      `mongodb+srv://${USER}:${PASSWORD}@cluster0.dsf8k.mongodb.net/products?retryWrites=true&w=majority`
    );

    await Product.findOneAndUpdate(
      { id: req.body.id },
      {
        name: "apple",
      }
    );

    res.status(200).json(Product);

    mongoose.disconnect();
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import db from "../../src/utils/db";

// type Data = {
//   name: any[];
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await db.connect();
    await Product.create({ name: req.body.name });
    await db.disconnect();

    res.status(200).json(Product);
  }

  if (req.method === "GET") {
    await db.connect();
    const products = await Product.find({});
    await db.disconnect();

    res.status(200).json(products);
  }

  if (req.method === "PUT") {
    await db.connect();
    await Product.findByIdAndUpdate(req.body.id, {
      name: "apple",
    });
    await db.disconnect();

    res.status(200).json(Product);
  }

  if (req.method === "DELETE") {
    await db.connect();
    await Product.findByIdAndDelete(req.body.id);
    await db.disconnect();

    res.status(200).json(Product);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "models/Product";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/mongo";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, cookies } = req;

  const token = cookies.token;

  // dbConnect();

  try {
    dbConnect();
    console.log("db connected");
  } catch (error) {
    console.log(error);
    res.status(500).json("PIZDAaaaaaaaa");
  }

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      // res.status(500).json(err);
      res.status(500).json("PIZDA");
    }
  }

  if (method === "POST") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!");
    // }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

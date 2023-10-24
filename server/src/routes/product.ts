import { Router, Request, Response } from "express";
import { ProductModel } from "../models/products";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (error) {
    res.status(400).json({ error });
  }
});



export { router as productRouter };

import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { verifyToken } from "./user";
import { UserModel } from "../models/user";
import { ProductErrors } from "../errors";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/checkout", async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID);

    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
    }

    if (productIDs.length !== products.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (totalPrice > user.availableMoney) {
      return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_MONEY });
    }
    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    res.status(400).json({ error });
  }
});
export { router as productRouter };

import { Router, Request, Response, NextFunction } from "express";
import { UserModel, IUser } from "../models/user";
import { UserErrors } from "../errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    newUser.save();
    res.json({ message: "User Registered Succesfully" });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

router.post("/login", verifyToken, async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token, userID: user._id });
  } catch (error) {
    res.status(500).json({ type: error });
  }
});

router.get('/availableMoney/:userID',verifyToken, async (req: Request, res: Response) => {
  const {userID} = req.params

  try {
    const user = await UserModel.findById(userID);
    if(!user){
      return res.status(400).json({type: UserErrors.NO_USER_FOUND})
    }

    res.status(200).json({availableMoney: user.availableMoney})
  } catch (error) {
    res.status(500).json({error})
  }
})

export { router as userRouter };

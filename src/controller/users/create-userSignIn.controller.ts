import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user baihgui" });
      return;
    }

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "password buruu" });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.json({
      message: "amjilttai newterlee",
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "aldaa garlaa" });
  }
};

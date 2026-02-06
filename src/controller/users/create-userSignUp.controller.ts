import { Request, Response } from "express";
import { UserModel } from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyUserEmail } from "../../utils/mail";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, phoneNumber, address } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await new UserModel({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    }).save();

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    await verifyUserEmail(
      email,
      `${process.env.BACKEND_API}/users/verify-user?token=${token}`,
    );

    res.status(200).json({
      message: "Batalgaajuulah link email ruu chini yvuullaa",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: " aldaa garsan",
      error,
    });
  }
};

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";
import { generate6DigitCode } from "../../utils/code";
import { sendVerifyCodeEmail } from "../../utils/resetPass.mail"; 

export const resetPass = async (req: Request, res: Response) => {
  try {
    const { email, token, code, newPassword } = req.body;

   
    if (email && !token && !code && !newPassword) {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "user oldsongui" });
      }

      const resetCode = generate6DigitCode();

      const resetToken = jwt.sign(
        { userId: user._id, code: resetCode },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      await sendVerifyCodeEmail(user.email, resetCode);

      return res.json({
        message: "6 orontoi reset code email ruu yvuulsan",
        token: resetToken, 
      });
    }


    if (token && code && newPassword) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { userId: string; code: string };

      if (decoded.code !== code) {
        return res.status(400).json({ message: "code buruu" });
      }

      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "user oldsongui" });
      }

      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();

      return res.json({
        message: "password amjilttai soligdloo ✅",
      });
    }


    return res.status(400).json({
      message: "buruu req.body format",
    });
  } catch (err: any) {
    return res.status(400).json({
      message: "token esvel code buruu / hugatsaa duussan",
      error: err?.message,
    });
  }
};





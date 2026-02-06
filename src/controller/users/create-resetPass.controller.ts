import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models";
import { generate6DigitCode } from "../../utils/code";
import { sendVerifyCodeEmail } from "../../utils/resetPass.mail";

export const resetPass = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user oldsongui" });
    }

 
    const code = generate6DigitCode(); 


    const token = jwt.sign(
      { userId: user._id, code },
      process.env.JWT_SECRET as string,
      { expiresIn: "5m" }
    );

    
    await sendVerifyCodeEmail(user.email, code);

    return res.json({
      message: "Reset password code email ruu yvuulsan",
      token, 
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "aldaa garsan",
      error: err?.message,
    });
  }
};




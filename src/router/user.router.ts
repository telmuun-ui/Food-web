import { Router } from "express";
import { signUpController } from "../controller/users";
import { signInController } from "../controller/users";
import { resetPass } from "../controller/users";
export const authRouter = Router();


authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-in", signInController);
authRouter.post("/resetPass", resetPass)

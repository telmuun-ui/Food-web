import { Router } from "express";
import { getFoodById } from "../controller/foods/get-food.controller";
import { createFood } from "../controller";

export const foodRouter = Router();

foodRouter.get("/get-food", getFoodById);
foodRouter.post("/create-food", createFood);

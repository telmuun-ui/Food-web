import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const getFoodById = async (req: Request, res: Response) => {
  const food = await FoodModel.find().populate("category");
  res.status(200).send(food);
};

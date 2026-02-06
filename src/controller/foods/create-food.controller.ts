import { Request, Response } from "express";
import { FoodModel } from "../../models/food.model";

export const createFood = async (req: Request, res: Response) => {
  const { foodName, price, image, ingredients, category } = req.body;
  const food = await FoodModel.create({
    foodName,
    price,
    image,
    ingredients,
    category,
  });

  res.status(200).json({
    message: "food amjilttai nemegdlee",
    data: food,
  });
};

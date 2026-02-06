import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";
export const createFoodCategory = async (req: Request, res: Response) => {
  const { categoryName } = req.body;

  const category = await FoodCategoryModel.create({ categoryName });

  res.status(200).send(category);
};
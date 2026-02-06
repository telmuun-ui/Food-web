import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";
export const deleteFoodCategory = async (req: Request, res: Response) => {
  const { foodCategoryId } = req.body;

  const category = await FoodCategoryModel.findByIdAndDelete(foodCategoryId);

  res.status(200).send(category);
};
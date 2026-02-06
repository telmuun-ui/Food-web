import { Request, Response } from "express";
import { FoodCategoryModel } from "../../models";

export const updateFoodCategory = async (req: Request, res: Response) => {
  const { categoryName, id } = req.body;

  const category = await FoodCategoryModel.findByIdAndUpdate(
    id,
    {
      categoryName,
    },
    { new: true },
  );

  res.status(200).send(category);
};

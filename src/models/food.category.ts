import { Schema, model, models, Types, Model } from "mongoose";

export type FoodCategory = {
  categoryName: string;
};

const FoodCategorySchema = new Schema<FoodCategory>(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const FoodCategoryModel: Model<FoodCategory> =
  models.FoodCategory ||
  model<FoodCategory>("FoodCategory", FoodCategorySchema);

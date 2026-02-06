import { Router } from "express";
import { getFoodCategories, createFoodCategory, updateFoodCategory, deleteFoodCategory } from "../controller/categories";

export const CategoryRouter = Router();
CategoryRouter.post("/create-category", createFoodCategory)
CategoryRouter.get("/get-category", getFoodCategories)
CategoryRouter.patch("/patch-category", updateFoodCategory)
CategoryRouter.delete("/delete-category", deleteFoodCategory)
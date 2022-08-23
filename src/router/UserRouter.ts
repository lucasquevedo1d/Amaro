import express from "express";
import { ProductsController } from "../controller/ProductsController";







export const userRouter = express.Router();

userRouter.post("/signupProducts", new ProductsController().signupProducts);
userRouter.get("/getProductsById", new ProductsController().getProductsbyId);
userRouter.get("/getProductsByName", new ProductsController().getProductsbyName);
userRouter.get("/getProductsByTags", new ProductsController().getProductsbyTags);



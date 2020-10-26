import express from "express";
import accountController from "./controller";
import multer from "../../multer";
const accountRouter = express.Router();

accountRouter.get("/types", accountController.fetchTypes);

accountRouter.post(
  "/create-new",
  multer.single("image"),
  accountController.createNew
);

export default accountRouter;

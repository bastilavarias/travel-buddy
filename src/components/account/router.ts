import express from "express";
import accountController from "./controller";
import multer from "../../multer";
const accountRouter = express.Router();

accountRouter.post(
  "/create-new",
  multer.single("image"),
  accountController.createNew
);
accountRouter.get("/types", accountController.fetchTypes);
accountRouter.get("/soft-details", accountController.fetchSoftDetails);

export default accountRouter;

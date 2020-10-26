import express from "express";
import accountController from "./controller";
const accountRouter = express.Router();

accountRouter.get("/types", accountController.fetchTypes);

export default accountRouter;

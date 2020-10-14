import express from "express";
import authenticationController from "./controller";
const authenticationRouter = express.Router();

authenticationRouter.post("/signup", authenticationController.signup);

export default authenticationRouter;

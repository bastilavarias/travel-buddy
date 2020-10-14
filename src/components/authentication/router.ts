import express from "express";
import authenticationController from "./controller";
const authenticationRouter = express.Router();

authenticationRouter.post("/signup", authenticationController.signup);
authenticationRouter.post("/sign-in", authenticationController.signIn);

export default authenticationRouter;

import express from "express";
import authenticationController from "./controller";
const authenticationRouter = express.Router();
import passport from "passport";

authenticationRouter.post("/signup", authenticationController.signup);
authenticationRouter.post("/sign-in", authenticationController.signIn);
authenticationRouter.get(
  "/refresh-token",
  passport.authenticate("jwt", { session: false }),
  authenticationController.refreshToken
);

export default authenticationRouter;

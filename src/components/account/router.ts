import express from "express";
import accountController from "./controller";
import multer from "../../multer";
import passport from "passport";
const accountRouter = express.Router();

accountRouter.post(
  "/create-new",
  multer.single("image"),
  passport.authenticate("jwt", { session: false }),
  accountController.createNew
);
accountRouter.get(
  "/types",
  passport.authenticate("jwt", { session: false }),
  accountController.fetchTypes
);
accountRouter.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  accountController.fetchDetails
);
accountRouter.put(
  "/disable/:accountID",
  passport.authenticate("jwt", { session: false }),
  accountController.disable
);
accountRouter.put(
  "/enable/:accountID",
  passport.authenticate("jwt", { session: false }),
  accountController.enable
);
accountRouter.delete(
  "/delete/:accountID",
  passport.authenticate("jwt", { session: false }),
  accountController.delete
);

export default accountRouter;

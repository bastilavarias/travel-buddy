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
accountRouter.put(
  "/update",
  multer.single("image"),
  passport.authenticate("jwt", { session: false }),
  accountController.update
);
accountRouter.put(
  "/update/password",
  passport.authenticate("jwt", { session: false }),
  accountController.updatePassword
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
accountRouter.get("/tour-guides", accountController.fetchTourGuides);
accountRouter.get(
  "/tour-guide/record/:id",
  passport.authenticate("jwt", { session: false }),
  accountController.getTourGuideRecord
);
accountRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  accountController.getInformation
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
accountRouter.put(
  "/verify/:accountID",
  passport.authenticate("jwt", { session: false }),
  accountController.verify
);
accountRouter.delete(
  "/delete/:accountID",
  passport.authenticate("jwt", { session: false }),
  accountController.delete
);

export default accountRouter;

import express from "express";
import multer from "../../multer";
import itineraryController from "./controller";
import passport from "passport";
const itineraryRouter = express.Router();

itineraryRouter.post(
  "/create-new/:postID",
  passport.authenticate("jwt", { session: false }),
  itineraryController.createNew
);
itineraryRouter.post(
  "/upload-images",
  multer.array("images"),
  passport.authenticate("jwt", { session: false }),
  itineraryController.uploadImages
);
itineraryRouter.get("/", itineraryController.fetch);
itineraryRouter.delete(
  "/delete/:postID",
  passport.authenticate("jwt", { session: false }),
  itineraryController.delete
);
itineraryRouter.put(
  "/disable/:postID",
  passport.authenticate("jwt", { session: false }),
  itineraryController.disable
);
itineraryRouter.put(
  "/enable/:postID",
  passport.authenticate("jwt", { session: false }),
  itineraryController.enable
);

export default itineraryRouter;

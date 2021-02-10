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

itineraryRouter.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  itineraryController.update
);
itineraryRouter.get(
  "/inquiry",
  passport.authenticate("jwt", { session: false }),
  itineraryController.getInquiries
);
itineraryRouter.get(
  "/review",
  passport.authenticate("jwt", { session: false }),
  itineraryController.getReviews
);
itineraryRouter.post(
  "/inquiry",
  passport.authenticate("jwt", { session: false }),
  itineraryController.createInquiry
);
itineraryRouter.post(
  "/inquiry/reply",
  passport.authenticate("jwt", { session: false }),
  itineraryController.createInquiryReply
);
itineraryRouter.post(
  "/upload-images",
  multer.array("images"),
  passport.authenticate("jwt", { session: false }),
  itineraryController.uploadImages
);
itineraryRouter.put(
  "/update-images",
  multer.array("images"),
  passport.authenticate("jwt", { session: false }),
  itineraryController.updateImages
);
itineraryRouter.get("/", itineraryController.fetch);
itineraryRouter.get(
  "/soft-details/:postID",
  itineraryController.getSoftDetails
);
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

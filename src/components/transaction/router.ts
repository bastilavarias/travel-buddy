import express from "express";
import transactionController from "./controller";
import passport from "passport";
const transactionRouter = express.Router();

transactionRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  transactionController.fetch
);
transactionRouter.get(
  "/transaction-number",
  passport.authenticate("jwt", { session: false }),
  transactionController.getTransactionNumber
);
transactionRouter.get(
  "/available-tour-guides/:fromDate/:toDate",
  transactionController.fetchAvailableTourGuides
);
transactionRouter.get(
  "/client-bookings/:clientID",
  passport.authenticate("jwt", { session: false }),
  transactionController.fetchClientBookings
);
transactionRouter.get(
  "/client-booking/:transactionID",
  passport.authenticate("jwt", { session: false }),
  transactionController.getClientBooking
);
transactionRouter.post(
  "/checkout/:postID/:clientID/:tourGuideID/:stripeToken",
  passport.authenticate("jwt", { session: false }),
  transactionController.checkout
);

transactionRouter.post(
  "/review",
  passport.authenticate("jwt", { session: false }),
  transactionController.createReview
);

export default transactionRouter;

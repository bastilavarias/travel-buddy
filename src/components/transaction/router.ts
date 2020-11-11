import express from "express";
import transactionController from "./controller";
const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.fetch);
transactionRouter.get(
  "/transaction-number",
  transactionController.getTransactionNumber
);
transactionRouter.get(
  "/available-tour-guides/:fromDate/:toDate",
  transactionController.fetchAvailableTourGuides
);
transactionRouter.post(
  "/checkout/:postID/:clientID/:tourGuideID/:stripeToken",
  transactionController.checkout
);

export default transactionRouter;

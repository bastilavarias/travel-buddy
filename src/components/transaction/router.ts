import express from "express";
import transactionController from "./controller";
const transactionRouter = express.Router();

transactionRouter.get(
  "/transaction-number",
  transactionController.getTransactionNumber
);
transactionRouter.get(
  "/available-tour-guides/:fromDate/:toDate",
  transactionController.fetchAvailableTourGuides
);

export default transactionRouter;

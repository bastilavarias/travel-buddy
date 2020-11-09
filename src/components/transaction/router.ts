import express from "express";
import transactionController from "./controller";
const transactionRouter = express.Router();

transactionRouter.get(
  "/transaction-number",
  transactionController.getTransactionNumber
);

export default transactionRouter;

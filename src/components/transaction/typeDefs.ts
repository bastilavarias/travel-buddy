import { IStripeBasePayload } from "../stripe/typeDefs";

export type TransactionNumber = string;

export type IsTourGuideAvailable = boolean;

export interface ITransactionServiceCheckoutPayload {
  fromDate: Date | string;
  toDate: Date | string;
  payment: IStripeBasePayload;
  clientID: number;
  postID: number;
  tourGuideID: number;
}

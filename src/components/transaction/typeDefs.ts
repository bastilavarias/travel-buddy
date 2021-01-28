import { IStripeBasePayload } from "../stripe/typeDefs";

export type TransactionNumber = string;

export type IsTourGuideAvailable = boolean;

export interface ITransactionBasePayload {
  fromDate: Date | string;
  toDate: Date | string;
  clientID: number;
  postID: number;
  tourGuideID: number;
}

export interface ITransactionServiceCheckoutPayload
  extends ITransactionBasePayload {
  payment: IStripeBasePayload;
}

export interface ITransactionModelSavePayload extends ITransactionBasePayload {
  customNumber: string;
}
export interface ITransactionReviewInput {
  transactionID: number;
  accountID: number;
  review: {
    itinerary: {
      text: string;
      rating: number;
    };
    tourGuide: {
      text: string;
      rating: number;
    };
  };
}

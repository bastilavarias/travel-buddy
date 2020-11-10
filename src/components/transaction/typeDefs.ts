export type TransactionNumber = string;

export type IsTourGuideAvailable = boolean;

export interface ITransactionServiceValidateDateResult {
  message: string;
  tourGuides: Account[];
}

export interface ITransactionServiceFetchAvailableTourGuidesInput {
  fromDate: Date | string;
  toDate: Date | string;
}

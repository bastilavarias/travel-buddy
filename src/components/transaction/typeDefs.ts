export type TransactionNumber = string;

export type IsTourGuideAvailable = boolean;

export interface ITransactionServiceFetchAvailableTourGuidesInput {
  fromDate: Date | string;
  toDate: Date | string;
}

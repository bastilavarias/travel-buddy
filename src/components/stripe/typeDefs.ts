export interface IStripeBasePayload {
  amount: number;
  token: string;
}

export interface IStripeServicePayPayload extends IStripeBasePayload {
  email: string;
  description: string;
}

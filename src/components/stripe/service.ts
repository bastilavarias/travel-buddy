import { IStripeServicePayPayload } from "./typeDefs";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
  typescript: true,
});

const stripeService = {
  async pay(payload: IStripeServicePayPayload) {
    const { description, token, email, amount } = payload;
    const customerCreateParams: Stripe.CustomerCreateParams = {
      description,
      email,
      source: token,
    };
    const customer: Stripe.Customer = await stripe.customers.create(
      customerCreateParams
    );
    const chargeCreateParams: Stripe.ChargeCreateParams = {
      amount,
      currency: "usd",
      customer: customer.id,
    };
    await stripe.charges.create(chargeCreateParams);
  },
};

export default stripeService;

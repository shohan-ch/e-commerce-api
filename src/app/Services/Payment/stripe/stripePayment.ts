import Stripe from "stripe";
import dbTransaction from "../core/dbTransaction";
import CallApi from "../lib/callApi";
import StripeCredentail from "./stripeCredentail";

class StripePayment extends StripeCredentail {
  public callApi: any;
  public merchantName: string = "ecommerce";

  constructor() {
    super();
    this.callApi = new CallApi();
  }

  async init(amount: number) {
    const { appKeY, secret } = this.credential;
    let stripe = new Stripe(secret);

    let session: any = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1PGOQTP9FsaCdzGuUJ0IJhJ4",
          quantity: 5,
        },
        {
          price: "price_1PGOQTP9FsaCdzGuUJ0IJhJ4",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/api/v1/stripe-callback?success=true`,
      cancel_url: `${process.env.BASE_URL}/api/v1/stripe-callback?canceled=true`,
    });

    if (session) {
      return session;
    } else {
      throw Error("Something wrong to execute stripe");
    }
  }
}

export default StripePayment;

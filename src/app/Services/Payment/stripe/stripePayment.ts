import Stripe from "stripe";
import dbTransaction from "../core/dbTransaction";
import CallApi from "../lib/callApi";
import StripeCredentail from "./stripeCredentail";

class StripePayment extends StripeCredentail {
  public products: any;

  constructor(products: any = null) {
    super();
    this.products = products;
  }

  async init(amount: number) {
    let credential = await this.getCredentials();
    let stripe = new Stripe(credential.secret);

    let saleItems = this.products.map((item: any) => {
      return {
        price_data: {
          currency: "bdt",
          product_data: {
            name: item.name,
          },
          unit_amount: item.quantityPrice * 100,
        },
        quantity: 1,
      };
    });

    let session: any = await stripe.checkout.sessions.create({
      // line_items: saleItems,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: "Total amount to pay",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.BASE_URL}/api/v1/make-payment/stripe-callback?success=true&paymentId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/api/v1/make-payment/stripe-callback?canceled=true`,
    });

    if (session) {
      return session;
    } else {
      throw Error("Something wrong to execute stripe");
    }
  }

  async stripeCallback(status: boolean, paymentId: string) {
    let credential = await this.getCredentials();
    let stripe = new Stripe(credential.secret);
    if (!status) {
      return { status: false, paymentMsg: "Payment canceled!" };
    } else {
      const response = await stripe.checkout.sessions.retrieve(paymentId);
      dbTransaction
        .storePaymentDetails(response, true)
        .then(() => {
          console.log("Database operation completed.");
        })
        .catch((error) => {
          throw Error(error);
        });

      return { status: true, paymentMsg: "Payment completed." };
    }
  }
}

export default StripePayment;

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default defineEventHandler(async (event) => {
  let orderAmount = 1400;
  let paymentIntent;

  try {
    paymentIntent = await stripe.paymentIntents.create({
      currency: 'pln',
      amount: orderAmount,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    return { clientSecret: paymentIntent.client_secret };
  } catch (e) {
    return e.message;
  }
});

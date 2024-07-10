import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event);
  const headers = event.node.req.headers;
  const signature = headers['stripe-signature'];

  let hookEvent, eventType, data;

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    setResponseStatus(event, 400, '⚠️  Webhook signature verification failed.');
    return;
  }

  data = hookEvent.data;
  eventType = hookEvent.type;

  if (eventType === 'payment_intent.succeeded') {
    console.log('💰 Payment captured!');
    console.log(data);
    setResponseStatus(event, 200, '💰 Payment captured!');
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
    console.log(data);
    setResponseStatus(event, 400, '❌ Payment failed');
  }

  return;
});

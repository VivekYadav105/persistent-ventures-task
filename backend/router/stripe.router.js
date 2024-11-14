const stripeRouter = require('express').Router()
const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const { auth } = require('../middleware/auth.middleware')
const client = require('../utils/db').client
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

stripeRouter.get('/',(req,res,next)=>{})

stripeRouter.post('/create-checkout-session',auth, async (req, res, next) => {
    try {
        const { priceId, couponId, planId,payment } = req.body;
        console.log(req.body);
        
        if(req.user.planId&&!payment){
            res.statusCode = 409 
            throw new Error("You already have a plan")
        }
        console.log(req.user)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            discounts: couponId ? [{ coupon: couponId }] : undefined,
            mode:payment||'subscription',
            metadata: {
                userId: req.user.userId,
                planId: planId,
            },
            success_url: `${process.env.NODE_FRONTEND_URL}/main/plans?purchase=success`,
            cancel_url: `${process.env.NODE_FRONTEND_URL}/main/plans?purchase=cancel`,
        });
        return res.json({ id: session.id });
    } catch (error) {
        next(error);
    }
});

stripeRouter.post('/webhook', bodyParser.raw({ type: '*/*' }), async (req, res) => {
    const signature = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    console.log("Inside Stripe webhook route");
    console.log("Signature:", signature);
    console.log("Endpoint Secret:", endpointSecret);

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
        console.log("Webhook event constructed successfully");
    } catch (err) {
        console.error('Webhook signature verification failed.', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Event type:", event.type);

    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    

    // Check for the event type
    if (event.type === 'checkout.session.completed') {
        console.log('Checkout session completed');
        const session = event.data.object;
        const userId = session.metadata?.userId;  // Ensure userId is present

        console.log("Checkout session completed for user:", userId);

        if (!userId) {
            console.error("UserId is missing in session metadata");
            return res.status(400).send('UserId is required in metadata');
        }

        try {
            // Update the user in your database here based on the userId
            if(!session.metadata?.planId){
                console.log("PlanId is missing in session metadata");
                return res.status(400).send('PlanId is required in metadata');
            }
            const planId = session.metadata?.planId;
            let creditsLeft = 0;
            if(planId==1){
                creditsLeft = 20;  
            }else if(planId==2){
                creditsLeft = 30;
            }else if(planId==3){
                creditsLeft = 50;
            }
            await client.user.update({
                where: { userId: userId },
                data: {
                    planId: planId,
                    creditsLeft:creditsLeft
                },
            });
            console.log('User updated successfully after purchase');
        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).send('Failed to update user');
        }
    } else {
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Acknowledge receipt of the event
    res.status(200).json({ received: true });
});

  
module.exports = stripeRouter;
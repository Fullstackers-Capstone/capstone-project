const stripe = require('stripe')(process.env.stripe_test);
const express = require('express');
const app = express.Router();

const YOUR_DOMAIN = 'http://localhost:3000/#/unlock-pro/';

app.post('/create-checkout-session', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: 'price_1NHvC4FI2Gqt1Ym7j8FWCkz9',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });

        res.redirect(303, session.url);
    } catch(error) {
        next(error);
    }
});

module.exports = app;


// const stripe = require('stripe')(process.env.stripe_test);
// const express = require('express');
// const app = express.Router();


// const YOUR_DOMAIN = 'http://localhost:3000/#/unlock-pro/';

// app.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: 'price_1NHvC4FI2Gqt1Ym7j8FWCkz9',
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${YOUR_DOMAIN}?success=true`,
//       cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     });
  
//     res.redirect(303, session.url);
//   });


//   module.exports = app;

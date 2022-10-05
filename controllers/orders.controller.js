const {HOST_ADDRESS, STRIPE_KEY} = require('../config');


const stripe = require('stripe')(STRIPE_KEY);
  // change the key to your secret stripe key
const Order = require("../models/order.model");
const User = require("../models/user.model");


async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function(item){
      return {
        
        price_data:{
          currency: 'usd',
          product_data: {
            name: item.product.title,
            description: item.product.description,
            // images: []    images must be uploaded somewhere, they can't be a on a local machine
          },
          unit_amount: +item.product.price.toFixed(2) * 100
        },
        quantity: item.quantity,
      }
    }) ,
    mode: 'payment',
    success_url: `${HOST_ADDRESS}/orders/success`, //address must be changed if hosted on a server
    cancel_url: `${HOST_ADDRESS}/orders/failure`,  //address must be changed if hosted on a server
  });

  res.redirect(303, session.url);

}

function getSuccess(req,res){
  res.render('customer/orders/success');
}

function getFailure(req,res){
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};

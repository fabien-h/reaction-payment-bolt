/**
 * When a cart is created or updated, Bolt server
 * is called to create a new order
 */

import MethodHooks from "/imports/plugins/core/core/server/method-hooks.js";
import { Cart } from "/lib/collections";

import BoltSDK from "../boltpay";

const onUpdate = (reason, options) => {
  if (options.error) return false;

  /**
   * Create the order with the new details from the cart
   * during the order creation, the cart is set as updating
   * with the boolean "boltOrderCreationRunning"
   */
  console.log(options.result.cart._id);
  // Cart.update(
  //   { _id: options.result.cart._id },
  //   { $set: { boltOrderCreationRunning: true } },
  //   (err, res) => console.log(err, res)
  // );

  //console.log(Cart.findOne({ _id: options.result.cart._id }));

  console.log(reason, options);
  //console.log(BoltSDK);

  // var a = {
  //   result:
  //   {
  //     cart:
  //     {
  //       _id: 'AT45cv9q5k6N8aE2a',
  //       accountId: '9eXw9cBppzNgatFw2',
  //       anonymousAccessToken: null,
  //       currencyCode: 'USD',
  //       createdAt: 2018 - 12 - 07T16: 38: 22.669Z,
  //       items: [Array],
  //       shopId: 'J8Bhq3uTtdgwZx3rz',
  //       updatedAt: 2018 - 12 - 07T16: 38: 22.669Z,
  //       workflow: [Object]
  //     },
  //     incorrectPriceFailures: [],
  //     minOrderQuantityFailures: [],
  //     token: null
  //   },
  //   error: undefined,
  //   arguments: [[[Object]]],
  //   hooksProcessed: 0
  // }

  return true;
};

MethodHooks.afterMethods({
  "cart/createCart": options => onUpdate("cart/createCart", options)
});

MethodHooks.afterMethods({
  "cart/mergeCart": options => onUpdate("cart/mergeCart", options)
});

MethodHooks.afterMethods({
  "cart/addToCart": options => onUpdate("cart/addToCart", options)
});

MethodHooks.afterMethods({
  "cart/removeFromCart": options => onUpdate("cart/removeFromCart", options)
});

MethodHooks.afterMethods({
  "cart/setShipmentMethod": options =>
    onUpdate("cart/setShipmentMethod", options)
});

MethodHooks.afterMethods({
  "cart/setShipmentAddress": options =>
    onUpdate("cart/setShipmentAddress", options)
});

MethodHooks.afterMethods({
  "cart/setPaymentAddress": options =>
    onUpdate("cart/setPaymentAddress", options)
});

MethodHooks.afterMethods({
  "cart/unsetAddresses": options => onUpdate("cart/unsetAddresses", options)
});

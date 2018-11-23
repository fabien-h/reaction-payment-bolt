/**
 * When a cart is created or updated, Bolt server
 * is called to create a new order
 */

import MethodHooks from "/imports/plugins/core/core/server/method-hooks.js";

MethodHooks.afterMethods({
  "cart/createCart": options => {
    if (options.error) return;
    console.log("cart/createCart", options);
  }
});

MethodHooks.afterMethods({
  "cart/mergeCart": options => {
    if (options.error) return;
    console.log("cart/mergeCart", options);
  }
});

MethodHooks.afterMethods({
  "cart/addToCart": options => {
    if (options.error) return;
    console.log("cart/addToCart", options);
  }
});

MethodHooks.afterMethods({
  "cart/removeFromCart": options => {
    if (options.error) return;
    console.log("cart/removeFromCart", options);
  }
});

MethodHooks.afterMethods({
  "cart/setShipmentMethod": options => {
    if (options.error) return;
    console.log("cart/setShipmentMethod", options);
  }
});

MethodHooks.afterMethods({
  "cart/setShipmentAddress": options => {
    if (options.error) return;
    console.log("cart/setShipmentAddress", options);
  }
});

MethodHooks.afterMethods({
  "cart/setPaymentAddress": options => {
    if (options.error) return;
    console.log("cart/setPaymentAddress", options);
  }
});

MethodHooks.afterMethods({
  "cart/unsetAddresses": options => {
    if (options.error) return;
    console.log("cart/unsetAddresses", options);
  }
});

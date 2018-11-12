/* eslint camelcase: 0 */
import Reaction from "/imports/plugins/core/core/server/Reaction";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  label: "BoltPayment",
  name: "payments-bolt",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  graphQL: {
    resolvers,
    schemas
  },
  paymentMethods: [
    {
      name: "iou_example",
      displayName: "IOU Example"
    }
  ],
  settings: {
    "mode": false,
    "payments-bolt": {
      enabled: false,
      apiKey: ""
    }
  },
  registry: [
    // Settings panel
    {
      label: "Example Payment", // this key (minus spaces) is used for translations
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "boltSettings"
    },

    // Payment form for checkout
    {
      template: "ExampleIOUPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});

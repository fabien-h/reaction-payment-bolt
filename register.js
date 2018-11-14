/* eslint camelcase: 0 */
import Reaction from "/imports/plugins/core/core/server/Reaction";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  label: "BoltPayment",
  name: "payments-bolt",
  icon: "fa fa-bolt",
  autoEnable: true,
  graphQL: {
    resolvers,
    schemas
  },
  settings: {
    "mode": false,
    "payments-bolt": {
      enabled: false,
      apiKey: "",
      signingSecret: "",
      publicKey: "",
      boltOnly: false
    }
  },
  registry: [
    // Settings panel
    {
      label: "Bolt",
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "boltSettings"
    }
  ]
});

/* eslint camelcase: 0 */
import Reaction from "/imports/plugins/core/core/server/Reaction";
import resolvers from "./server/no-meteor/resolvers";
import schemas from "./server/no-meteor/schemas";

Reaction.registerPackage({
  label: "BoltPayment",
  name: "payments-bolt",
  icon: "fa fa-bolt",
  graphQL: {
    resolvers,
    schemas
  },
  settings: {
    apiKey: "",
    boltOnly: false,
    enabled: false,
    publicKey: "",
    signingSecret: ""
  },
  registry: [
    {
      label: "Bolt",
      provides: ["paymentSettings"],
      template: "boltSettings"
    }
  ]
});

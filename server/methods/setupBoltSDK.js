import { Meteor } from "meteor/meteor";
import * as Collections from "/lib/collections";
import BoltSDK from "../boltpay";

export default () => {
  /**
   * Fetch Bolt data from the Package collection
   */
  const BoltData = Collections.Packages.findOne({
    name: "payments-bolt"
  });
  if (!BoltData)
    throw new Meteor.Error(
      "The Bolt package seems not available in the Packages collection. Restart your project to initialize it."
    );

  /**
   * Pick the keys
   */
  const apiKey = (BoltData.settings || {}).apiKey;
  const signingSecret = (BoltData.settings || {}).signingSecret;
  const publicKey = ((BoltData.settings || {}).public || {}).publicKey;
  const productionMode = ((BoltData.settings || {}).public || {})
    .productionMode;
  const enabled = ((BoltData.settings || {}).public || {}).enabled;

  if (!enabled) return;

  if (!apiKey || !signingSecret || !publicKey)
    throw new Meteor.Error(
      "You cannot initialize the Bolt SDK without an apiKey, a signingSecret and a publicKey."
    );

  /**
   * Init the SDK
   */
  BoltSDK.init({
    apiKey,
    environment: productionMode ? "production" : "sandbox",
    hookURL: Meteor.absoluteUrl() + "bolt-server-hook",
    publicKey,
    shippingURL: Meteor.absoluteUrl() + "bolt-server-shipping"
  });
};

// import { Router } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { getCDN_URL } from "../../getBoltURLS";

Meteor.subscribe("Packages", null, () => {
  const boltPackage = Packages.findOne({ name: "payments-bolt" });
  if (!boltPackage || !boltPackage.settings.public.enabled || !boltPackage.settings.public.publicKey) return false;

  const CDN_URL = getCDN_URL(Boolean(boltPackage.settings.public.productionMode));

  const trackScript = document.createElement("script");
  trackScript.id = "bolt-track";
  trackScript.type = "text/javascript";
  trackScript.src = `${CDN_URL}/track.js`;
  trackScript.setAttribute("data-publishable-key", boltPackage.settings.public.publicKey);
});

// Router.Hooks.onEnter(() => {
//   // track
// });

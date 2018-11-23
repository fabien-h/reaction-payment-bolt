import "./methods/example";
import "./i18n";

import "./utils/onCartUpdate";

import { BrowserPolicy } from "meteor/browser-policy-common";

BrowserPolicy.content.allowOriginForAll("*.bolt.com");
BrowserPolicy.content.allowOriginForAll("*.mixpanel.com");

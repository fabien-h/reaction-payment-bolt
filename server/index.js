import "./methods/example";
import "./i18n";

import { BrowserPolicy } from "meteor/browser-policy-common";

BrowserPolicy.content.allowOriginForAll("*.bolt.com");
BrowserPolicy.content.allowOriginForAll("*.mixpanel.com");

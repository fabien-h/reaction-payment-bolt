import React from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import getCart from "/imports/plugins/core/cart/client/util/getCart";
import {
  replaceComponent,
  Components,
  composeWithTracker
} from "/imports/plugins/core/components/lib";
import { getCDN_URL } from "../../getBoltURLS";

class CartDrawer extends React.PureComponent {
  componentDidMount() {
    const { packageData } = this.props;
    if (!packageData.settings.public.enabled) return false;

    if (window.BoltCheckout) {
      return this.configureCheckout();
    } else {
      const CDN_URL = getCDN_URL(
        Boolean(packageData.settings.public.productionMode)
      );

      const buttonScript = document.createElement("script");
      buttonScript.id = "bolt-connect";
      buttonScript.type = "text/javascript";
      buttonScript.src = `${CDN_URL}/connect.js`;
      buttonScript.setAttribute(
        "data-publishable-key",
        packageData.settings.public.publicKey
      );
      buttonScript.addEventListener("load", () => this.configureCheckout());
      document.body.appendChild(buttonScript);
    }
  }

  configureCheckout = () => {
    var cart = {};
    var callbacks = {};

    var hints = {
      prefill: {
        firstName: "Bolt",
        lastName: "User",
        email: "email@example.com",
        phone: "1112223333",
        addressLine1: "1235 Howard St",
        addressLine2: "Unit D",
        city: "San Francisco",
        state: "California",
        zip: "94103",
        country: "US"
      }
    };
    window.BoltCheckout.configure(cart, hints, callbacks);
  };

  render() {
    const {
      productItems,
      pdpPath,
      handleRemoveItem,
      handleCheckout,
      handleImage,
      handleShowProduct,
      packageData
    } = this.props;

    console.log(this.props)
    console.log(getCart())

    return (
      <div>
        <div className="cart-drawer-swiper-container">
          <div className="cart-drawer-swiper-wrapper">
            <div className="cart-drawer-swiper-slide">
              <Components.CartSubTotal />
            </div>
            {productItems.map(item => (
              <div className="cart-drawer-swiper-slide" key={item._id}>
                <Components.CartItems
                  item={item}
                  pdpPath={pdpPath}
                  handleImage={handleImage}
                  handleRemoveItem={handleRemoveItem}
                  handleShowProduct={handleShowProduct}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="cart-drawer-pagination" />
        {packageData.settings.public.enabled && (
          <div style={{ padding: "10px", textAlign: "center" }}>
            <div className="bolt-checkout-button" />
          </div>
        )}
        {(!packageData.settings.public.enabled ||
          !packageData.settings.public.boltOnly) && (
          <div style={{ padding: "10px", textAlign: "center" }}>
            <Components.Button
              bezelStyle="solid"
              className={{
                "btn-lg": true
              }}
              status="cta"
              id="btn-checkout"
              label="Checkout now"
              i18nKeyLabel="cartDrawer.checkout"
              onClick={handleCheckout}
            />
          </div>
        )}
      </div>
    );
  }
}

CartDrawer.propTypes = {
  handleCheckout: PropTypes.func,
  handleImage: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  handleShowProduct: PropTypes.func,
  pdpPath: PropTypes.func,
  productItems: PropTypes.array
};

const composer = (props, onData) => {
  const packageSubscription = Meteor.subscribe("Packages", Reaction.getShopId());

  if (packageSubscription.ready()) {
    const packageData = Packages.findOne({
      name: "payments-bolt",
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

replaceComponent("CartDrawer", composeWithTracker(composer)(CartDrawer));

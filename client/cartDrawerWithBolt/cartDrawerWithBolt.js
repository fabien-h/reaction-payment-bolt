import React from "react";
import PropTypes from "prop-types";
import { Reaction, i18next } from "/client/api";
import { Packages } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { replaceComponent, Components, composeWithTracker } from "/imports/plugins/core/components/lib";

const CartDrawer = ({ productItems, pdpPath, handleRemoveItem, handleCheckout, handleImage, handleShowProduct, packageData }) => (
  <div>
    {console.log(packageData.settings["payments-bolt"])}
    <div className="cart-drawer-swiper-container">
      <div className="cart-drawer-swiper-wrapper">
        <div className="cart-drawer-swiper-slide">
          <Components.CartSubTotal />
        </div>
        {productItems.map((item) => (
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
    {packageData.settings["payments-bolt"].enabled && <div>There will be bolt</div>}
    <div className="row">
      <Components.Button
        bezelStyle="solid"
        className={{
          "btn-lg": true,
          "btn-block": true
        }}
        status="cta"
        id="btn-checkout"
        label="Checkout now"
        i18nKeyLabel="cartDrawer.checkout"
        onClick={handleCheckout}
      />
    </div>
  </div>
);

CartDrawer.propTypes = {
  handleCheckout: PropTypes.func,
  handleImage: PropTypes.func,
  handleRemoveItem: PropTypes.func,
  handleShowProduct: PropTypes.func,
  pdpPath: PropTypes.func,
  productItems: PropTypes.array
};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("Packages", Reaction.getShopId());
  if (subscription.ready()) {
    const packageData = Packages.findOne({
      name: "payments-bolt",
      shopId: Reaction.getShopId()
    });
    onData(null, { packageData });
  }
};

replaceComponent("CartDrawer", composeWithTracker(composer)(CartDrawer));

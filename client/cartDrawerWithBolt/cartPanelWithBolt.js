import React from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { Components, replaceComponent } from "/imports/plugins/core/components/lib";

const CartPanel = (props) => (
  <div style={{ textAlign: "center" }}>
    <span id="spin">
      <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{ marginBottom: "10px", marginTop: "10px", fontSize: "2.65em" }} />
    </span>
    <div className="cart-alert-text">{}</div>
    <div className="cart-alert-checkout">
      <Components.Button
        id="btn-checkout"
        bezelStyle="solid"
        className="btn-lg btn-block"
        i18nKeyLabel="cartDrawer.checkout"
        label="Checkout now"
        onClick={(event) => {
          event.preventDefault();
          document.querySelector("#cart-drawer-container").classList.toggle("opened");
          Reaction.toggleSession("displayCart");
        }}
        status="success"
      />
    </div>
  </div>
);

CartPanel.propTypes = {
  checkout: PropTypes.func,
  onClick: PropTypes.func
};

replaceComponent("CartPanel", CartPanel);

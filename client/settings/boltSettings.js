import { Template } from "meteor/templating";
import React, { Component } from "react";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { Reaction, i18next } from "/client/api";
import { Switch, TextField, Translation } from "/imports/plugins/core/ui/client/components";
import "./boltSettings.html";

class BoltSettings extends Component {
  constructor(props) {
    super(props);

    try {
      this.state = {
        apiKey: props.packageData.settings["payments-bolt"].apiKey || "",
        signingSecret: props.packageData.settings["payments-bolt"].signingSecret || "",
        publicKey: props.packageData.settings["payments-bolt"].publicKey || "",
        boltOnly: props.packageData.settings["payments-bolt"].boltOnly || false
      };
    } catch (error) {
      this.state = {
        apiKey: "",
        signingSecret: "",
        publicKey: "",
        boltOnly: false
      };
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call(
      "registry/update",
      this.props.packageData._id,
      "payments-bolt",
      [
        {
          property: "apiKey",
          value: this.state.apiKey
        },
        {
          property: "signingSecret",
          value: this.state.signingSecret
        },
        {
          property: "publicKey",
          value: this.state.publicKey
        },
        {
          property: "boltOnly",
          value: this.state.boltOnly
        }
      ],
      (error) => {
        if (error) return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
        return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
      }
    );
  };

  render() {
    const { apiKey, boltOnly, signingSecret, publicKey } = this.state;

    return (
      <React.Fragment>
        {(!apiKey || !signingSecret || !publicKey) && (
          <div className="alert alert-danger">
            <Translation defaultValue="You need an API Key, a Signing Secret and a Publishable Key." i18nKey="admin.paymentSettings.apiKeyNeeded" />
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <Translation defaultValue="API Key" i18nKey="admin.paymentSettings.apiKeyLabel" />
          <TextField name="apiKey" type="text" value={apiKey} onChange={(e, value) => this.setState({ apiKey: value })} />

          <Translation defaultValue="Signing Secret" i18nKey="admin.paymentSettings.signingSecretLabel" />
          <TextField name="signingSecret" type="text" value={signingSecret} onChange={(e, value) => this.setState({ signingSecret: value })} />

          <Translation defaultValue="Publishable Key" i18nKey="admin.paymentSettings.publicKeyLabel" />
          <TextField name="publicKey" type="text" value={publicKey} onChange={(e, value) => this.setState({ publicKey: value })} />

          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flexShrink: 0, marginRight: 10 }}>
              <Switch
                name="boltOnly"
                checked={boltOnly}
                onChange={(e, value) => {
                  console.log(value);
                  this.setState({ boltOnly: value });
                }}
              />
            </div>
            <Translation defaultValue="Bolt only (hide other payments)." i18nKey="admin.paymentSettings.boltOnly" />
          </div>

          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

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

Template.boltSettings.helpers({
  BoltSettings() {
    return {
      component: composeWithTracker(composer)(BoltSettings)
    };
  }
});

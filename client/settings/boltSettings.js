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
        apiKey: props.packageData.settings.apiKey || "",
        boltOnly: props.packageData.settings.boltOnly || false,
        enabled: props.packageData.settings.enabled || false,
        publicKey: props.packageData.settings.publicKey || "",
        signingSecret: props.packageData.settings.signingSecret || ""
      };
    } catch (error) {
      this.state = {
        apiKey: "",
        boltOnly: false,
        enabled: false,
        publicKey: "",
        signingSecret: ""
      };
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call(
      "/Packages/update",
      { _id: this.props.packageData._id },
      {
        $set: {
          "settings.apiKey": this.state.apiKey,
          "settings.boltOnly": this.state.boltOnly,
          "settings.enabled": this.state.enabled,
          "settings.publicKey": this.state.publicKey,
          "settings.signingSecret": this.state.signingSecret
        }
      },
      (error) => {
        if (error) return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
        return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
      }
    );
  };

  render() {
    const { apiKey, boltOnly, enabled, publicKey, signingSecret } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="rui list-group">
          <div className="rui list-group-item" role="button" tabIndex="0">
            <div className="rui list-item-content">
              <Translation defaultValue="Bolt enabled" i18nKey="admin.paymentSettings.boltEnabled" />
            </div>
            <div className="rui list-item-action">
              <Switch name="enabled" checked={enabled} onChange={(e, value) => this.setState({ enabled: value })} />
            </div>
          </div>
        </div>

        {(!apiKey || !signingSecret || !publicKey) && (
          <div className="alert alert-danger">
            <Translation defaultValue="You need an API Key, a Signing Secret and a Publishable Key." i18nKey="admin.paymentSettings.apiKeyNeeded" />
          </div>
        )}

        <Translation defaultValue="API Key" i18nKey="admin.paymentSettings.apiKeyLabel" />
        <TextField name="apiKey" type="text" value={apiKey} onChange={(e, value) => this.setState({ apiKey: value })} />

        <Translation defaultValue="Signing Secret" i18nKey="admin.paymentSettings.signingSecretLabel" />
        <TextField name="signingSecret" type="text" value={signingSecret} onChange={(e, value) => this.setState({ signingSecret: value })} />

        <Translation defaultValue="Publishable Key" i18nKey="admin.paymentSettings.publicKeyLabel" />
        <TextField name="publicKey" type="text" value={publicKey} onChange={(e, value) => this.setState({ publicKey: value })} />

        <div className="rui list-group">
          <div className="rui list-group-item" role="button" tabIndex="0">
            <div className="rui list-item-content">
              <Translation defaultValue="Bolt only (hide other payments)." i18nKey="admin.paymentSettings.boltOnly" />
            </div>
            <div className="rui list-item-action">
              <Switch name="boltOnly" checked={boltOnly} onChange={(e, value) => this.setState({ boltOnly: value })} />
            </div>
          </div>
        </div>

        <button className="btn btn-primary pull-right" type="submit">
          <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
        </button>
      </form>
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

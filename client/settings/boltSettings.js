import { Template } from "meteor/templating";
import React, { Component } from "react";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { Reaction, i18next } from "/client/api";
import { TextField, Translation } from "/imports/plugins/core/ui/client/components";
import "./boltSettings.html";

class BoltSettings extends Component {
  constructor(props) {
    super(props);
    try {
      this.state = {
        apiKey: props.packageData.settings["payments-bolt"].apiKey || ""
      };
    } catch (error) {
      this.state = {
        apiKey: ""
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
        }
      ],
      (error) => {
        if (error) return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
        return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
      }
    );
  };

  render() {
    const { apiKey } = this.state;

    return (
      <React.Fragment>
        {!apiKey && (
          <div className="alert alert-info">
            <Translation defaultValue="Example Credentials" i18nKey="admin.paymentSettings.exampleCredentials" />
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <TextField label="API Key" name="apiKey" type="text" value={apiKey}
            onChange={(e, value) => this.setState({ apiKey: value })}
          />

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

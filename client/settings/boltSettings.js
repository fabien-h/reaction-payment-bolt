import { Template } from "meteor/templating";
import React, { Component } from "react";
import { composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { Packages } from "/lib/collections";
import { Reaction, i18next } from "/client/api";
import SettingsForm from "./components/settingsForm";
import "./bolt.html";

class BoltSettings extends Component {
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ apiKey: e.target.value });
  };

  handleSubmit = (settings) => {
    e.preventDefault();
    const packageId = this.props.packageData._id;
    const { settingsKey } = this.props.packageData.registry[0];

    const fields = [
      {
        property: "apiKey",
        value: settings.apiKey
      },
      {
        property: "support",
        value: settings.support
      }
    ];

    this.saveUpdate(fields, packageId, settingsKey);
  };

  saveUpdate = (fields, id, settingsKey) => {
    Meteor.call("registry/update", id, settingsKey, fields, (err) => {
      if (err) {
        return Alerts.toast(i18next.t("admin.settings.saveFailed"), "error");
      }
      return Alerts.toast(i18next.t("admin.settings.saveSuccess"), "success");
    });
  };

  render() {
    const { settingsKey } = this.props.packageData.registry[0];
    return <SettingsForm onChange={this.handleChange} onSubmit={this.handleSubmit} settings={this.props.packageData.settings[settingsKey]} />;
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

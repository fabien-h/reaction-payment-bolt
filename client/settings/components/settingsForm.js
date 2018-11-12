import React, { Component } from "react";
import { TextField, Translation, Checkbox } from "/imports/plugins/core/ui/client/components";

class BoltSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        apiKey: props.settings.apiKey,
        support: props.settings.support
      },
      checkbox: {
        "Authorize": props.settings.support.includes("Authorize"),
        "De-authorize": props.settings.support.includes("De-authorize"),
        "Capture": props.settings.support.includes("Capture"),
        "Refund": props.settings.support.includes("Refund")
      }
    };
  }

  handleStateChange = (e) => {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  };

  handleCheckBox = (event, isInputChecked, name) => {
    const { checkbox, settings } = this.state;
    checkbox[name] = isInputChecked;
    this.setState({ checkbox });
    if (!settings.support.includes(name) && isInputChecked) {
      settings.support.push(name);
      return this.setState({ settings });
    }
    const index = settings.support.indexOf(name);
    settings.support.splice(index, 1);
    return this.setState({ settings });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.settings);
  };

  render() {
    const { settings } = this.props;
    const setting = this.state.settings;

    return (
      <React.Fragment>
        {!settings.apiKey && (
          <div className="alert alert-info">
            <Translation defaultValue="Example Credentials" i18nKey="admin.paymentSettings.exampleCredentials" />
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <TextField label="API Key" name="apiKey" type="text" onChange={this.handleStateChange}
            value={setting.apiKey}
          />

          <span className="control-label">
            <Translation defaultValue="Payment provider supported methods" i18nKey="reaction-payments.paymentSettings.supportedMethodsLabel" />
          </span>
          <br />

          <div>
            <Checkbox label="Authorize" onChange={this.handleCheckBox} name="Authorize" checked={this.state.checkbox.Authorize} />
          </div>

          <div>
            <Checkbox label="De-authorize" onChange={this.handleCheckBox} name="De-authorize" checked={this.state.checkbox["De-authorize"]} />
          </div>

          <div>
            <Checkbox label="Capture" onChange={this.handleCheckBox} name="Capture" checked={this.state.checkbox.Capture} />
          </div>

          <div>
            <Checkbox label="Refund" onChange={this.handleCheckBox} name="Refund" checked={this.state.checkbox.Refund} />
          </div>

          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default BoltSettingsForm;

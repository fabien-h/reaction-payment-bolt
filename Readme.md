# Reaction commerce Bolt payment plugin

This is a plugin to add [Bolt](https://bolt.com/) as a payment platform to your reaction commerce website.

## How does it work?

"Chekout with Bolt" button is added to the mini-cart view and the user can switch to the faster Bolt chekout experience instead of the reaction commerce chekout process. You can choose to have only the Bolt or to also keep the reaction process. It can be useful if you want to keep using paypal for example.

## Install the plugin

You have to get the code from this repo to your project in `imports/plugins/custom/payments-bolt`. You can download this repo or clone it to get the updates easier with:

    git clone https://github.com/fabien-h/reaction-payments-bolt.git imports/plugins/custom/payments-bolt

Then you have to restart reaction

    reaction reset -n && reaction

## Have the plugin working in dev mode

To work, the bolt plugin need to be able to receive messages from the [Bolt](https://bolt.com/) server. So, you have to expose your machine to the internet and make the bolt server point to your machine.

### Expose your machine to internet with ngrok

The easiest way to expose your machine is to use [ngrok](https://ngrok.com/).

- Create an account here : <https://dashboard.ngrok.com/user/signup>.
- Get your token here : <https://dashboard.ngrok.com/auth> for the ngrokToken.
- (optionnal) Get a payed account to have a reserved address, go to <https://dashboard.ngrok.com/reserved> and setup a domain name (like `your-bolt-local-test-server.ngrok.io`) for the ngrokURL.
- Start ngrok with something like `./ngrok http 3000 -subdomain=your-bolt-local-test-server.ngrok.io`.
- You can now inspect the incoming connections on <http://127.0.0.1:4040/inspect/http>

### Make bolt hooks point to your exposed machine

Go to your bolt account settings : <https://merchant-sandbox.bolt.com/settings> and paste your full url (like `https://your-bolt-local-test-server.ngrok.io`)

### Card details for dev :

- Card number: 4111 1111 1111 3000
- Expiration: Any future month/year
- CVV: Any 3 digits

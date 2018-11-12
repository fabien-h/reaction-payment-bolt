import { decodeAddressOpaqueId } from "/imports/plugins/core/graphql/server/no-meteor/xforms/address";
import { decodeCartOpaqueId, decodeCartItemsOpaqueIds } from "/imports/plugins/core/graphql/server/no-meteor/xforms/cart";
import { decodeFulfillmentMethodOpaqueId } from "/imports/plugins/core/graphql/server/no-meteor/xforms/fulfillment";
import { decodeShopOpaqueId } from "/imports/plugins/core/graphql/server/no-meteor/xforms/shop";
import placeOrderWithExampleIOUPaymentMutation from "/imports/plugins/custom/payments-bolt/server/no-meteor/mutations/placeOrderWithExampleIOUPayment";

/**
 * @name "Mutation.placeOrderWithExampleIOUPayment"
 * @method
 * @memberof Payments/GraphQL
 * @summary resolver for the placeOrderWithExampleIOUPayment GraphQL mutation
 * @param {Object} parentResult - unused
 * @param {Object} args.input - an object of all mutation arguments that were sent by the client
 * @param {Object} args.input.order - The order input
 * @param {Object} args.input.payment - Payment info
 * @param {Object} args.input.payment.billingAddress - The billing address
 * @param {String} [args.input.payment.billingAddressId] - An ID to attach to this billing address. For tracking whether this is from a saved address.
 * @param {String} args.input.payment.fullName - The full name of the person who needs to eventually pay
 * @param {String} [args.input.clientMutationId] - An optional string identifying the mutation call
 * @param {Object} context - an object containing the per-request state
 * @return {Promise<Object>} PlaceOrderWithExampleIOUPaymentPayload
 */
export default async function placeOrderWithExampleIOUPayment(parentResult, { input }, context) {
  const { clientMutationId = null, order, payment } = input;
  const { cartId: opaqueCartId, fulfillmentGroups, shopId: opaqueShopId } = order;
  const { billingAddressId: opaqueBillingAddressId } = payment;

  const billingAddressId = opaqueBillingAddressId ? decodeAddressOpaqueId(opaqueBillingAddressId) : null;
  const cartId = opaqueCartId ? decodeCartOpaqueId(opaqueCartId) : null;
  const shopId = decodeShopOpaqueId(opaqueShopId);

  const transformedFulfillmentGroups = fulfillmentGroups.map((group) => ({
    ...group,
    items: decodeCartItemsOpaqueIds(group.items),
    selectedFulfillmentMethodId: decodeFulfillmentMethodOpaqueId(group.selectedFulfillmentMethodId),
    shopId: decodeShopOpaqueId(group.shopId)
  }));

  const { orders, token } = await placeOrderWithExampleIOUPaymentMutation(context, {
    payment: {
      ...payment,
      billingAddressId
    },
    order: {
      ...order,
      cartId,
      fulfillmentGroups: transformedFulfillmentGroups,
      shopId
    }
  });

  return {
    clientMutationId,
    orders,
    token
  };
}

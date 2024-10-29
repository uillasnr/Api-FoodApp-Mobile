import repositoryOrders from "../repositories/repositoryOrders.js";

async function getOrder() {
  const orders = await repositoryOrders.getOrders();
  return orders;
}

async function getOrdersId(id) {
  const order = await repositoryOrders.getOrdersId(id);
  return order;
}

async function InsertOrder(id_user, data) {
  const order = await repositoryOrders.InsertOrder(id_user, data);
  return order;
}


export default { getOrder, getOrdersId, InsertOrder };

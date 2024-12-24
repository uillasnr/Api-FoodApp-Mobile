import { execute } from "../database/sqlite.js";

 async function getOrders() {
  const sql = `
    SELECT p.*, e.NAME, e.ICON, s.description as description_status
    FROM [ORDER] p
    JOIN company e ON (e.id_company = p.id_company)
    join ORDER_STATUS s on (s.status = p.status)
    ORDER BY "order", order_id DESC
  `;
  const orders = await execute(sql, []);
  return orders;
}
 
async function getOrdersId(id) {

  const sql = `
    SELECT p.*, e.NAME, e.ICON
    FROM [ORDER] p
    JOIN company e ON (e.id_company = p.id_company)
    WHERE p.ORDER_ID = ?
    ORDER BY "order", order_id DESC
  `;

  const sqlItens = 
  `SELECT i.*, p.name, p.description, p.icon
   from order_item i
   join product p on (p.product_ID = i.product_ID)
   WHERE i.ORDER_ID = ?
   ORDER BY i.ITEM_ID`;
   
  const order = await execute(sql, [id]);
  const itens = await execute(sqlItens, [id]);

  order[0].itens = itens;

  return order[0];
}

async function InsertOrder(id_user, data) {
  // Inserir o pedido
  const sql = `
    INSERT INTO [ORDER] (id_user, company_id, subtotal, delivery_fee, total, order_date, status) 
    VALUES (?, ?, ?, ?, ?, datetime('now'), 'P')
    returning order_id
  `;

  const order = await execute(sql, [id_user, data.company_id, data.subtotal, data.delivery_fee, data.total]);

  const order_id = order[0].order_id; 

  // Insere os itens do pedido (corrigindo para data.order_item)
  for (const item of data.order_item) {
    const sqlItem = `
      INSERT INTO ORDER_ITEM (order_id, product_id, obs, quantity, unit_price, total_price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await execute(sqlItem, [
      order_id,
      item.product_id,
      item.obs,
      item.quantity,
      item.unit_price,
      item.total_price
    ]);
  }

  return { order_id }; 
}



export default {getOrders, getOrdersId, InsertOrder };

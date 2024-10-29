
import serviceOrders from "../services/serviceOrders.js"

async function getOrders(req, res) {
  try {
    const orders = await serviceOrders.getOrder();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getOrdersId(req, res) {
  try {
    const id = req.params.id;
    const order = await serviceOrders.getOrdersId(id);
    res.status(200).json(order);

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function InsertOrder(req, res) {
  try {
    const id_user = req.id_user;
    const { company_id, subtotal, delivery_fee, total, order_item } = req.body; 

    const order = await serviceOrders.InsertOrder(id_user, { company_id, subtotal, delivery_fee, total, order_item });
    
    res.status(201).json(order);
  } catch (error) {
    console.error("Error inserting order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



export default { getOrders, getOrdersId, InsertOrder };

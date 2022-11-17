import db from './db.config';

export const createOrder = async (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    ammount,
    product_name,
    product_description,
  } = req.body;
  try {
    const sanitizedAmmount = parseInt(ammount);
    console.log(req.body);

    const order = await db.orders.create({
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      product_name,
      product_description,
      ammount: sanitizedAmmount,
    });
    console.log(order);
    res.send({ order });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await db.orders.findAll();
    // if (!orders) {
    //   return res.status(404).send({ error: 'No orders found' });
    // }
    res.send({ orders });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    customer_name,
    customer_email,
    customer_phone,
    customer_address,
    ammount,
    product_name,
    product_description,
  } = req.body;
  try {
    const order = await db.orders.findOne({ where: { id } });
    if (!order) {
      return res.status(400).send({ error: 'Order not found' });
    }
    await order.update({
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      ammount,
      product_name,
      product_description,
    });
    res.send({ order });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

import db from './db.config';
import fetch from 'cross-fetch';
import { authHeader } from './portpos';

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
  const auth = authHeader();

  try {
    const sanitizedAmmount = parseInt(ammount);
    const PORTPOSRES = await fetch(process.env.PORTPOS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: auth,
      },
      body: JSON.stringify({
        order: {
          ammount: sanitizedAmmount,
          currency: 'BDT',
          redirect_url: process.env.PORTPOS_REDIRECT_URL,
          ipn_url: process.env.PORTPOS_IPN_URL,
        },
        product: {
          name: product_name,
          description: product_description,
        },
        billing: {
          customer: {
            name: customer_name,
            email: customer_email,
            phone: customer_phone,
            address: {
              street: customer_address,
              city: 'Dhaka',
              state: 'Dhaka',
              zipcode: '1200',
              country: 'Bangladesh',
            },
          },
        },
      }),
    });

    console.log('PORTPOSRES', PORTPOSRES);

    if (PORTPOSRES.status === 200) {
      const PORTPOSRESJSON = await PORTPOSRES.json();
      const order = db.orders.create({
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        ammount: sanitizedAmmount,
        product_name,
        product_description,
        status: 'PENDING',
        invoice_id: PORTPOSRESJSON.data.invoice_id,
      });
      console.log(order);
      return res.json({ order });
    }
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await db.orders.findAll();
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

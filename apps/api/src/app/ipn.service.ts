import db from './db.config';

export const notify = async (req, res) => {
  console.log('Incoming IPN');
  const invoice = req.query.invoice;
  const status = req.query.status;
  const ammount = req.query.amount;
  try {
    const order = await db.orders.findOne({
      where: { invoice_id: invoice, ammount: ammount },
    });
    if (!order) {
      return res.status(400).send({ error: 'Order not found' });
    }
    await order.update({ status });
    res.status(200).send({ message: 'Order updated' });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

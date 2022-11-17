import { Router } from 'express';
import { auth } from './auth.middleware';
import { login, register } from './auth.service';
import { updateOrder, createOrder, getOrders } from './order.service';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/order', auth, getOrders);

router.post('/order', auth, createOrder);

router.patch('/order', auth, updateOrder);

router.get('/', auth, (req, res) => {
  res.send({ message: 'Hello from API!' });
});

export default router;

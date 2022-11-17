import { Router } from 'express';
import { auth } from './auth.middleware';
import { login, register } from './auth.service';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/', auth, (req, res) => {
  res.send({ message: 'Hello from API!' });
});

export default router;

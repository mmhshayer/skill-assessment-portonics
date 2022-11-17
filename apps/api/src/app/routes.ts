import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.send({ type: 'GET' });
});

router.post('/register', (req, res) => {
  res.send({ type: 'POST' });
});

export default router;

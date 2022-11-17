import * as jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }
};

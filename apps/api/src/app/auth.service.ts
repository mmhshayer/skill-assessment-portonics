import * as bcrypt from 'bcrypt';
import { User } from './user.model';
import * as jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.findOne({ username });
  if (!exists) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  const valid = await bcrypt.compare(password, exists.password);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ id: exists._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).send({
    message: 'Login successful',
    username: exists.username,
    token,
  });
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: 'You must provide username and password.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.send({ username });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

import * as crypto from 'crypto';

export const authHeader = () => {
  const md5 = crypto
    .createHash('md5')
    .update(process.env.PORTPOS_SECRET_KEY + Date.now())
    .digest('hex');
  const authtoken = Buffer.from(
    `${process.env.PORTPOS_APP_KEY}:${md5}`
  ).toString('base64');
  return `Bearer ${authtoken}`;
};

import * as dotenv from 'dotenv';
import * as express from 'express';
import router from './app/routes';
import db from './app/db.config';

dotenv.config();

const app = express();
app.use(express.json());

db.sequelize
  .sync()
  .then(() => {
    console.log('Syncing Db');
  })
  .catch((err) => {
    console.log(err);
  });


app.use('/api', router);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

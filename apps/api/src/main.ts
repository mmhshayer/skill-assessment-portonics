import * as dotenv from 'dotenv';
import * as express from 'express';
import { dbConnect } from './app/db.config';
import router from './app/routes';

dotenv.config();
dbConnect();

const app = express();
app.use(express.json());

app.use('/api', router);

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

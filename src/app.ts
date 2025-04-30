// libs
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
// routers
import router from './routers';
// databases
import instanceMongoDatabase from './databases/init.mongodb';
// import instanceRedis from './dbs/init.redis';
// middlewares
import { handleError, handleNotFound } from './middlewares/handleError.middleware';
import { rateLimitInstance } from './middlewares/validate.middleware';
// others
import config from './config';

const app = express();

instanceMongoDatabase;
// instanceRedis;

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(rateLimitInstance);

// router
app.use('/api/v1', router);
app.use(handleNotFound);
app.use(handleError);

app.listen(config.APP_PORT, () => {
  console.log(`http://localhost:${config.APP_PORT}`);
});

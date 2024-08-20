import express from 'express';
import helmet from 'helmet';
// class-transformer
import 'reflect-metadata';

import router from './routers';
import instanceMongoDatabase from './dbs/init.mongodb';
import instanceRedis from './dbs/init.redis';
import config from './config';
import { handleError, handleNotFound } from './middlewares/handleErrorMiddleware';

const app = express();

// connect db
instanceMongoDatabase;
instanceRedis;

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// router
app.use('/api/v1', router);
app.use(handleNotFound);
app.use(handleError);

app.listen(config.APP_PORT, () => {
    console.log(`http://localhost:${config.APP_PORT}`);
});

import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';

import router from './routers';
import dbConnect from './db';
import config from './config';

const app = express();

// connect db
dbConnect();

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/v1', router);

app.listen(config.APP_PORT, () => {
    console.log(`http://localhost:${config.APP_PORT}`);
});
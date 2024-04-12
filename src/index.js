import express from 'express';
import helmet from 'helmet';

import router from './routers/index.js';
import dbConnect from './db/index.js';
import config from './config/index.js';

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

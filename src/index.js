import express from 'express';
import helmet from 'helmet';
import router from './routers/index.js';
import dbConnect from './config/dbMonggo/index.js';

const port = 3000;
const app = express();

// connect db
dbConnect();

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

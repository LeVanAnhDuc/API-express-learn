const express = require('express');
const helmet = require('helmet');
const router = require('./routers');
const db = require('./config/dbMonggo');

const port = 3000;
const app = express();

// connect db
db.connect();

//init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

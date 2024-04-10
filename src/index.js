const express = require('express');
const router = require('./routers');
// const bodyParser = require('body-parser');
const db = require('./config/dbMonggo');

const port = 3000;
const app = express();
db.connect();

// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(jsonParser);
// app.use(urlencodedParser);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

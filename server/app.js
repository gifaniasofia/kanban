if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
})
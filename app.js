require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const router = require('./router/router')

const port = process.env.PORT;

app.use(express.json());
app.use('/', router);

app.listen(port, async() => {
    console.log(`Server running on port ${port}`);
    await sequelize.authenticate();
    console.log('Database connected');
});
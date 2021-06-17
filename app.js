require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const authRouter = require('./router/authRouter');
const folderRouter = require('./router/folderRouter');
const taskRouter = require('./router/taskRouter');
const userRouter = require('./router/userRouter');

const port = process.env.PORT;

app.use(express.json());
app.use('/api/user', userRouter);
app.use ('/api/auth', authRouter);
app.use('/api/folder', folderRouter);
app.use('/api/task', taskRouter);

app.listen(port, async() => {
    console.log(`Server running on port ${port}`);
    await sequelize.sync({ force: true });
    // await sequelize.authenticate();
    console.log('Database connected');
});
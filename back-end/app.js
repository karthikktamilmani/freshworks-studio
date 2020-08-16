const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

sequelize = new Sequelize('karthi-4004', 'postgres', 'karthi@76', {
    host: 'localhost',
    dialect: 'postgres'
});

const feedDataRouter = require('./modules/feeddata.router')();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/feeddata', feedDataRouter);


// Option 1: Passing a connection URI


sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
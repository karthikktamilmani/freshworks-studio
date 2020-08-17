const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const cors = require('cors');


AWS = require('aws-sdk');
AWS.config.update({ region: "us-east-1" });
cwevents = new AWS.CloudWatchEvents({ apiVersion: '2015-10-07' });
lambda = new AWS.Lambda();
LAMBDA_ARN = "arn:aws:lambda:us-east-1:235997159748:function:my-fun";
RULE_ARN = "arn:aws:iam::235997159748:role/lambda_trigger";
LAMBDA_FUNCTION_NAME = "my-fun";

sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    //host: 'database-1.cbwg6worpedy.us-east-1.rds.amazonaws.com',
    host: process.env.DB_ENDPOINT,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const feedDataRouter = require('./modules/feeddata.router')();
app.use(feedDataRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
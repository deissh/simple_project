const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const config = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 2233,
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
}

const server = async () => {
    const client = await MongoClient.connect(config.uri);
    const collection = client
        .db('test__cc_database')
        .collection("payments_history");

    const app = express();
    app.use(bodyParser.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get('/health', (req, res) => {
        res.status(200).json({
            message: 'I\'m alive',
        });
    });

    app.post('/pay', async (req, res) => {
        // todo: request validation
        const data = {
            cc_number: req.body.cc_number,
            cc_owner: req.body.cc_owner,
            cc_exp_date: req.body.cc_exp_date,
            cc_cvv: req.body.cc_cvv,
            amount: req.body.amount,
        }
        const doc = await collection.insertOne(data);

        return res.status(200).json({
            request_id: doc.insertedId,
            amount: data.amount,
        });
    });

    app.listen(config.port, config.host, () => console.log("ready"));
};

server().catch(console.error);
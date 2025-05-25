const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const connection = require('./config/db.js');
const productRoute=require('./routes/productRoute.js')



app.use(express.json());


app.use('/product',productRoute)


app.listen(port, async () => {
    try {
        await connection;
        console.log(`server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});

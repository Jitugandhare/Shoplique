const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookieParser=require("cookie-parser");
const port = process.env.PORT;
const connection = require('./config/db.js');
const productRoute = require('./routes/productRoute.js')
const userRoute = require('./routes/userRoute.js');
const orderRoute = require('./routes/orderRoute.js');
const cors=require("cors")

process.on('uncaughtException', (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Server is shutting down, due to unhandled exception error`);
    process.exit(1);
})

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/order',orderRoute)


app.listen(port, async () => {
    try {
        await connection;
        console.log(`server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});

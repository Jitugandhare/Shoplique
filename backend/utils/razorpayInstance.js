const dotenv = require('dotenv');
dotenv.config();
const Razorpay = require('razorpay');


// Razor Pay Instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,

});

instance.orders.all().then(console.log).catch(console.error);

module.exports=instance;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 5000;
// const DB_NAME = "tutorial"

// routes
// var testAPIRouter = require("./routes/testAPI");
var BuyersRouter = require("./routes/Buyers");
var VendorRouter = require("./routes/Vendors");
var FoodRouter = require("./routes/Foods");
var OrderRouter = require("./routes/Orders");
var FavoriteRouter = require("./routes/favorite");

// setup API endpoints
// app.use("/testAPI", testAPIRouter);
app.use("/buyers", BuyersRouter);
app.use("/vendors", VendorRouter);
app.use("/foods", FoodRouter);
app.use("/orders", OrderRouter);
app.use("/favorite", FavoriteRouter);

// Connection to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const uri = process.env.ATLAS_URI;
mongoose.connect(uri , { useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})


app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});

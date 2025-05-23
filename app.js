const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const errorHandler = require('./middlewares/errorHandlerMiddlewares');
const app = express();

//Connect to mongodb
//username: ramonjulio9999
//password: WaKzzC59gBIQybeI
//ip address: 139.194.155.128
//connection string url: 
//mongodb+srv://ramonjulio9999:WaKzzC59gBIQybeI@ramond-cluster.orzf3u5.mongodb.net/?retryWrites=true&w=majority&appName=ramond-cluster
mongoose
.connect("mongodb+srv://ramonjulio9999:WaKzzC59gBIQybeI@tracker-cluster.orzf3u5.mongodb.net/tracker-db")
.then(() => console.log("DB Connected"))
.catch((e) => console.log(e));

//Middlewares
app.use(express.json()); //pass incoming json data

//Routes
app.use("/", usersRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//Errors
app.use(errorHandler);

//Start Server
const PORT = process.env.port || 8000;
app.listen(PORT, ()=>
    console.log(`Server is running on this port.. ${PORT} `)
);
const express=require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const restaurantRoutes=require('./routes/restaurant')
const locationRoutes=require('./routes/location')
const mealtypeRoutes=require('./routes/mealtype')
const menuRoutes=require('./routes/menu')
const paymentRoutes=require('./routes/payment')
const bcrypt = require("bcryptjs");
const app = express()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const { resolve } = require('path')
require('./models/userDetails')

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
  
const DBCONNECTIONSTRING =
  process.env.MONGO_URI ||
  "mongodb+srv://root:root@zomato.yt4qk.mongodb.net/mesakData";
mongoose.connect(
    DBCONNECTIONSTRING,{
        useNewUrlParser:true,
    }).then(()=>{
    console.log('mongodb connect success')
 })
 .catch((e)=>console.log(e));

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
 app.use('/restaurant',restaurantRoutes)
 app.use('/location',locationRoutes)
 app.use('/mealtype',mealtypeRoutes)
 app.use('/menu',menuRoutes)
 app.use('/pay',paymentRoutes)

 const User = mongoose.model("UserInfo");

 app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});


//listen to a port 
app.listen( process.env.PORT || 5000,()=>{
    console.log("express app is up and running on port 5000")
})


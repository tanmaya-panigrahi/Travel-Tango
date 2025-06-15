require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const axios = require("axios");


const url = "https://travel-tango.onrender.com/"; // Replace with your actual URL
const interval = 14 * 60 * 1000; // 14 minutes (render free tier sleeps after 15 minutes of inactivity)

function reloadWebsite() {
    axios.get(url)
        .then((response) => {
            console.log("Website reloaded successfully:", new Date().toISOString());
        })
        .catch((error) => {
            console.error(`Website reload error: ${error.message}`);
        });
}

// Start the reload interval after the server is up and running
setTimeout(() => {
    setInterval(reloadWebsite, interval);
    console.log("Website auto-reload started");
}, 10000); // Wait 10 seconds after server start before beginning the reload cycle



const connectDB1 = require("./BackEnd/server/config/db1");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("FrontEnd/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/destinations', express.static(path.join(__dirname, 'destinations')));
// app.use((req,res,next)=>{
//     res.locals.isLoggedin=req.session.isLoggedin;
//     next();
// })

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI1 }),
}))

app.use(expressLayout);
app.set('views', 'FrontEnd/views');
app.set('layout', './layouts/home');
app.set('view engine', 'ejs');

app.use("/", require("./BackEnd/server/routes/blog_login"));

//app.use("/",require("./BackEnd/server/routes/admin"));


connectDB1();
app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
})
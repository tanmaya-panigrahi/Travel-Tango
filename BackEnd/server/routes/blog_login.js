const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/posts");
const dest1 = require("../models/4N_5D");
const dest2 = require("../models/2N_3D");
const dest3 = require("../models/3N_4D");
const book_tickets = require("../models/book_tickets");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mainLayout = "layouts/main";
const login_signupLayout = "layouts/login_signup";
const errorLayout = "layouts/error_page";
const jwtSecret = process.env.JWT_SECRET;

// middle wares


// check login

const authMiddleWare = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render("layouts/error_page", { layout: errorLayout });

    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.id = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });

    }
}



// storage engine for blogs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");

    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({ storage: storage });


// storage engine for destinations
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "destinations/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload1 = multer({
    storage: storage1
}).array('images', 10);


// first request to the website
// login page 
// get method 

router.get("/", (req, res) => {
    try {
        const locals = {
            title: "Login",
            description: "Welcome to Travel Tango",

        }
        res.render("login", { locals, layout: login_signupLayout });

    }
    catch (err) {
        console.log(err);
    }

});


// home page 
// get method

router.get("/home", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Home",
            description: "Welcome to Travel Tango",
        }
        res.render("layouts/home", { locals });
    }
    catch (err) {
        console.log(err);
    }
});


// signup page
// get method 

router.get("/signup", async (req, res) => {
    try {
        const locals = {
            title: "signup",
            description: "Welcome to Travel Tango",
        }
        res.render("signup", { locals, layout: login_signupLayout });
    }
    catch (err) {
        console.log(err);
    }
});




// signup page 
// post method

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password, cnfpassword } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {

            if (password.length < 6) {
                return res.render("signup", { layout: login_signupLayout, error: "Password length must be 6 characters" });
            }
            if (email.endsWith("@gmail.com")==false && email.length > 10) {
                return res.render("signup", { layout: login_signupLayout, error:  "Please enter a valid email address" });

            }
            if (password !== cnfpassword) {
                return res.render("signup", { layout: login_signupLayout, error:  "Password do not match" });
            }    

            const user = await User.create({ userName: username, Email: email, password: hashedPassword });
            // return res.status(201).json({ message: "User created successfully" });
            res.redirect("/");
        }
        catch (err) {
            if (err.code === 11000) {
                return res.render("signup", { layout: login_signupLayout, error:  "User already exists" });
            }
            return res.render("layouts/error_page", { layout: errorLayout });
        }

    }
    catch (err) {
        console.log(err);
    }
});


// login page 
// post method

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ userName: username });
        if (!user) {
            return res.render("login", { layout: login_signupLayout, error: "Invalid Credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.render("login", { layout: login_signupLayout, error: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/home");

    }
    catch (err) {
        return res.status(401).json({message: "Invalid Credentials" });
    }
})


// logout 
// get method

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
})



// blogs part of the website


router.get("/blogs", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "blogs",
            description: "Welcome to Travel Tango",
        }
        let perPage = 4;
        let page = req.query.page || 1;
        const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Post.countDocuments({});
        const recentPage = parseInt(page) - 1;
        const hasRecentPage = recentPage > 0;
        const previousPage = parseInt(page) + 1;
        const hasPreviousPage = previousPage <= Math.ceil(count / perPage);
        res.render('blogs', { locals, posts, current: page, recentPage: hasRecentPage ? recentPage : null, previousPage: hasPreviousPage ? previousPage : null, currentPage: "/blogs", layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

// blog post page 

router.get("/blogs/:id", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "blogs",
            description: "Welcome to Travel Tango",
        }
        const post = await Post.findById(req.params.id);
        res.render("blog-post", { locals, post, layout: mainLayout });


    } catch (err) {
        console.log(err);

    }
});



// update post 
// get method

router.get("/update-post/:id", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Update Post",
            description: "Welcome to Travel Tango",
        }
        const post = await Post.findById(req.params.id);
        res.render("update-post", { locals, post, layout: mainLayout });
    } catch (err) {
        console.log(err);
    }
})


router.put("/update-post/:id", authMiddleWare, async (req, res) => {
    try {
        await Post.findByIdAndUpdate({ _id: req.params.id }, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/blogs`);
    } catch (err) {
        console.log(err);
    }
})

// search the blogs 
// post method

router.post("/search", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Welcome to Travel Tango",
        }
        const searchTerm = req.body.search;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const posts = await Post.find({
            $or: [
                { title: { $regex: searchNoSpecialChar, $options: 'i' } },
                { body: { $regex: searchNoSpecialChar, $options: 'i' } }
            ]
        });
        res.render("search", { locals, posts, layout: mainLayout });


    } catch (err) {
        console.log(err);
    }
})

// add post 
// get method

router.get("/add-post", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Add Post",
            description: "Welcome to Travel Tango",
        }
        res.render("add-post", { locals, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})


// add post
// post method


router.post("/add-post", authMiddleWare, upload.single("image"), async (req, res) => {
    try {
        const { title, content } = req.body;

        const image = req.file.filename;
        const post = await Post.create({ title: title, body: content, image: image });
        // res.status(201).json({message:"Post created successfully"});
        res.redirect("/blogs");
        // console.log(req.file.filename); 
    }
    catch (err) {
        console.log(err);
    }
})




// destinations part of the website


// will be deleted

// router.get("/destinations", async (req, res) => {
//     try {
//         const locals = {
//             title: "destinations",
//             description: "Welcome to Travel Tango",
//             isLoggedin: false
//         }
//         res.render("4N_5D", { locals, layout: mainLayout });
//     }
//     catch (err) {
//         console.log(err);
//     }
// });


// router.post("/destinations", upload1, async (req, res) => {
//     try {
//         const { title, place, aboutPlace, duration, day1, day2, day3, day4, day5, price, inclusion, exclusion } = req.body;
//         const images = req.files.map(file => file.filename);
//         const destination = await dest1.create({ title, place, aboutPlace, duration, day1, day2, day3, day4, day5, price, inclusion, exclusion, images });
//         res.status(201).json({ message: "Destination created successfully" });
//     }
//     catch (err) {
//         console.log(err);
//     }
// });



//  routes for the destinations

// 4N_5D

router.get("/leh-ladakh", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Ladakh",
            description: "Welcome to Travel Tango",
        }
        const data = await dest1.findOne({ place: 'Ladakh' });
        res.render("dest1", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/manali", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Manali",
            description: "Welcome to Travel Tango",
        }
        const data = await dest1.findOne({ place: 'Manali' });
        res.render("dest1", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/dubai", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Dubai",
            description: "Welcome to Travel Tango",
        }
        const data = await dest1.findOne({ place: 'Dubai' });
        res.render("dest1", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})


router.get("/thailand", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Thailand",
            description: "Welcome to Travel Tango",
        }
        const data = await dest1.findOne({ place: 'Thailand' });
        res.render("dest1", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})


router.get("/andaman-and-nicobar-islands", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Andaman and Nicobar Islands",
            description: "Welcome to Travel Tango",
        }
        const data = await dest1.findOne({ place: 'Andaman & Nicobar Island' });
        res.render("dest1", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})
// 3N_4D

router.get("/kasol", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Kasol",
            description: "Welcome to Travel Tango",
        }
        const data = await dest3.findOne({ place: 'Kasol' });
        res.render("dest3", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/mcLeod-ganj", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "McLeod Ganj",
            description: "Welcome to Travel Tango",
        }
        const data = await dest3.findOne({ place: 'McLeod Ganj' });
        res.render("dest3", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/maldives", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Maldives",
            description: "Welcome to Travel Tango",
        }
        const data = await dest3.findOne({ place: 'Maldives' });
        res.render("dest3", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})


// 2N_3D

router.get("/spiti-valley", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Spiti Valley",
            description: "Welcome to Travel Tango",
        }
        const data = await dest2.findOne({ place: 'Spiti Valley' });
        res.render("dest2", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})


router.get("/kashmir", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Kashmir",
            description: "Welcome to Travel Tango",
        }
        const data = await dest2.findOne({ place: 'Kashmir' });
        res.render("dest2", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

router.get("/bir-billing", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Bir Billing",
            description: "Welcome to Travel Tango",
        }
        const data = await dest2.findOne({ place: 'Bir Billing' });
        res.render("dest2", { locals, data: data, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})



// book tickets 
//get method

router.get("/book-tickets", authMiddleWare, async (req, res) => {
    try {
        const locals = {
            title: "Book Tickets",
            description: "Welcome to Travel Tango",
        }
        res.render("book_tickets", { locals, layout: mainLayout });
    }
    catch (err) {
        console.log(err);
    }
})

// post method

router.post("/book-tickets", authMiddleWare, async (req, res) => {
    try {
        const { name, email, phone, destinations, date, number_of_people, suggestions } = req.body;
        const booking = await book_tickets.create({ name, email, phone, destinations, date, number_of_people, suggestions });

        res.redirect("/book-tickets");

    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;
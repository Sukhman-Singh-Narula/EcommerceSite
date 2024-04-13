const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

app.use(express.json());
app.use(cors({
    origin: ['https://deploy-mern-1whq.vercel.app'],
    methods: ['POST','GET'],
    credentials: true
}));

// Database connection with MongoDB

mongoose.connect("mongodb+srv://sukhmannarula84:hLqHXIEUGfxBx4rC@cluster0.88aofcw.mongodb.net/ecommerce");

// API Creation

app.get('/', (req, res) => {
    res.send("Hello World");
});

// Image storage engine

const storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpost for images

app.use('/images', express.static('uploads/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        required: true

    }
});

app.post("/addproduct", async (req, res) => {

    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let lastProductArray = products.slice(- 1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Product has been added");
    res.json({
        success: 1,
        name: req.body.name
    });
});

// API for deleting products

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product has been deleted");
    res.json({
        success: true,
        name: req.body.name
    });
});

// API for getting all products

app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("all products fetched successfully");
    res.send(products);
});

// Schema for user model

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Creating Endpoint for registering users

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email id" })
    }

    let cart = {};
    for (let i = 1; i <= 100; i++) {
        cart[i] = 0;
    }
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        cartData: cart
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    console.log(req.body);
    console.log(hashedPassword);

    res.json({
        success: true,
        token: token
    });
});

// User login endpoint

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = bcryptjs.compare(req.body.password, user.password);
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({
                success: true,
                token: token
            });
        } else {
            res.json({
                success: false,
                errors: "Invalid password"
            });
        }
    } else {
        res.json({
            success: false,
            errors: "User not found"
        }); 
    }
});

// API for getting new collections

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    console.log("New Collection fetched successfully");
    res.send(newCollection);
});

// API for getting getting popular womens products
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({category:"Women"});
    let popularInWomen = products.slice(0,4);
    console.log("Popular in Women fetched successfully");
    res.send(popularInWomen);
});

// craeting EndPoint for storing cart data

// Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate using a valid token"});
    }else{
        try{
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
    }catch(error){
        res.status(401).send({errors: "Please authenticate using a valid token"});
    }
}};

app.post('/addtocart',fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
});

// API for removing cart objects

app.post('/removefromcart',fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId] > 0){
    userData.cartData[req.body.itemId] -=1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
});

// creating endpoint to get cart data
app.post('/getcart',fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if (!error) {
        console.log(`Server is running on port ${port}`);
    } else {
        console.log("Error found : " + error);
    }
});
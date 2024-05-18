//*--------------------------------------import modules----------------------------------------------------------------------------
const express = require("express");
const corse = require("cors");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

//*------------------------------------------init modules--------------------------------------------------------------------------

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const app = express();

app.use(corse({
    origin: process.env.FrentEnd,
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use('/images', express.static('images'));


app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/auth_web_wolf", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.json());

//*----------------------------------------- Database Models stucture ---------------------------------------------------

const User = mongoose.model('admin_user', {
    id: String,
    username: String,
    password: String,
});

const Inbox = mongoose.model('Inbox_from_contactus', {
    name: String,
    mobile_no: Number,
    email_id: String,
    contant: String,
});
const Clint_db = mongoose.model("clint_db", {
    clint_name: String,
    clint_contact_no: Number,
    clint_email_id: String,
    clint_domain: String,
    clint_logo: String,
});

const Blog_db = mongoose.model("blog_db", {
    blog_cover_imgs: String,
    title: String,
    contant: String,
});

const testimonial_db = mongoose.model("testimonial_db", {
    companey_name: String,
    companey_logo: String,
    Domain: String,
});

//*------------------------------------------------ end -------------------------------------------------------------------------

//*-------------------------------------Middleware to verify JWT token-----------------------------------------------------------
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(404).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

const blog_cover_img = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'images/blog_cover/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const blog_cover_upload = multer({ storage: blog_cover_img }).single('blog_cover_imgs')


const clint_logos = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/client/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const clint_logo_upload = multer({ storage: clint_logos }).single('clint_logo');

const testimonial_logo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/testimonial/');
    },
    filename: function(file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    },
});

const testimonial_logo_uplode = multer({ storage: testimonial_logo }).single('companey_logo');


//* Use the authenticateJWT middleware to protect routes
app.get('/admin/api/protected', authenticateJWT, (req, res) => {
    // This route is protected, and only authenticated users can access it
    res.status(200).json({ message: 'Autondaction successful' });
});

//*--------------------------------------------- Signup rought --------------------------------------------------------------
app.post('/admin/api/create_admin', async (req, res) => {
    const { id, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const exixtingid = await User.findOne({ id });
    if (exixtingid) {
        return res.status(400).json({ message: "User Id Alredy exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ id, username, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Signup successful' });
});


//*---------------------------------------------------- signim rought --------------------------------------------------

app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {expiresIn: '1hr'});

    res.json({ message: 'Login successful', token });
});

//*---------------------------------------- chech login rought ---------------------------------------------------------

app.get('/admin/api/check-auth', (req, res) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ isAuthenticated: false });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isAuthenticated: false });
        }

        // Token is valid, user is authenticated
        res.json({ isAuthenticated: true, userId: decoded.userId });
    });
});


//*----------------------------- resive data from clint to inbox ------------------------------------------------------

app.post('/admin/api/inbox_save', (req, res) => {
    try {
        const { name, mobile_no, email_id, contant } = req.body

        const inbox = new Inbox({ name, mobile_no, email_id, contant })
        inbox.save()

        return res.status(200).json({ message: 'saved in inbox successful' });
    } catch (error) {
        res.status(400).json({ "error": error })
    }
});

//*---------------------------- get data from database and send to clint side ------------------------------------------

app.get('/admin/api/inbox_get', authenticateJWT, async (req, res) => {
    try {
        const All_inbox = await Inbox.find()
        res.status(200).json({ All_inbox });
    } catch (error) {
        res.status(404).json({ error: error })
    }
});

//*------------------------------ Add clint to database ---------------------------------------------------------------

app.post('/admin/api/add_clint', authenticateJWT, clint_logo_upload, async (req, res) => {
    try {
        const { clint_name, clint_contact_no, clint_email_id, clint_domain } = req.body;
        const clint_logo = req.file.filename;
        const db_clint_save = new Clint_db({ clint_name, clint_contact_no, clint_email_id, clint_domain, clint_logo })
        await db_clint_save.save()
        res.status(200).json({ message: "Successfull created a clint" })

    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error })
    }
});

//*---------------------------- get client from database --------------------------------------------------------------

app.get('/admin/api/get_clint', async (req, res) => {
    try {
        const db_clint_get = await Clint_db.find();
        const usersWithImageUrls = await db_clint_get.map(user => {
            return {
                name: user.clint_name,
                email: user.clint_email_id,
                Domain: user.clint_domain,
                contact: user.clint_contact_no,
                clint_logo: `http://localhost:4000/images/client/${user.clint_logo}`
            };
        });
        res.status(200).json({ usersWithImageUrls });
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

//*------------------------------------ Add blog to database -----------------------------------------------------------

app.post('/admin/api/add_blog', authenticateJWT, blog_cover_upload, async (req, res) => {
    try {
        const { title, contant } = req.body;
        const blog_cover_imgs = req.file.filename;
        const blog_cover_save = new Blog_db({ title, contant, blog_cover_imgs })
        await blog_cover_save.save()
        res.status(200).json({ message : "Sucessfull" })
    } catch (error) {
        console.log(error)
        res.status(404).json({ "error": error });
    }
});

//*---------------------------------- get blog from database to send to clint -----------------------------------------

app.get('/admin/api/get_blog', async(req, res) => {
    try {
        const Blog_all = await Blog_db.find()
        const usersWithImageUrls = await Blog_all.map(Blog_all => {
            return {
                title: Blog_all.title,
                contant: Blog_all.contant,
                blog_cover_imgs: `http://localhost:4000/images/blog_cover/${Blog_all.blog_cover_imgs}`
            };
    })
        res.status(200).json({ usersWithImageUrls });
    } catch (error) {
        console.log({ "error": error})
        res.status(404).json({ "error": error })
    }
});


app.get('admin/api/get_admin', authenticateJWT, async (req, res) => {
    try {
        res.json({ userdetails: req.user });
    } catch (error) {
        console.log({ "error": error})
        res.status(404).json({ "error": error })
    }
    
});

app.post('admin/api/add_testimonial', authenticateJWT, testimonial_logo_uplode,  async (req, res) => {});

app.listen(4000, () => {
    console.log(`Server started on http://localhost:4000/`)
});

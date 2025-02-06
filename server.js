const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/ai-websites', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    favorites: [String]
});

const suggestionSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    suggestion: String
});

const User = mongoose.model('User', userSchema);
const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Middleware للتحقق من التوكن
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};

// تسجيل مستخدم جديد
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// تسجيل الدخول
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'secret_key');
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// تحديث الملف الشخصي
app.put('/profile', authenticate, upload.single('profilePicture'), async (req, res) => {
    const { username } = req.body;
    const user = await User.findById(req.userId);
    user.username = username;
    if (req.file) user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();
    res.send('Profile updated');
});

// إضافة موقع إلى المفضلات
app.post('/favorites', authenticate, async (req, res) => {
    const { website } = req.body;
    const user = await User.findById(req.userId);
    user.favorites.push(website);
    await user.save();
    res.send('Favorite added');
});

// عرض قائمة المفضلات
app.get('/favorites', authenticate, async (req, res) => {
    const user = await User.findById(req.userId);
    res.json(user.favorites);
});

// إرسال مقترح
app.post('/suggestions', authenticate, async (req, res) => {
    const { suggestion } = req.body;
    const newSuggestion = new Suggestion({ userId: req.userId, suggestion });
    await newSuggestion.save();
    res.send('Suggestion submitted');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
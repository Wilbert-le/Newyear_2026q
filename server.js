require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Greeting = require('./models/Greeting');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API: Get random greeting from MongoDB
app.get('/api/greetings/random', async (req, res) => {
    try {
        const count = await Greeting.countDocuments({ isActive: true });
        
        if (count === 0) {
            return res.status(404).json({ 
                success: false,
                error: 'No greetings found' 
            });
        }
        
        const random = Math.floor(Math.random() * count);
        const greeting = await Greeting.findOne({ isActive: true }).skip(random);
        
        if (!greeting) {
            return res.status(404).json({ 
                success: false,
                error: 'No greetings found' 
            });
        }
        
        res.json({ 
            success: true,
            greeting: {
                _id: greeting._id,
                content: greeting.content,
                isActive: greeting.isActive,
                createdAt: greeting.createdAt
            }
        });
    } catch (error) {
        console.error('Error fetching greeting:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// API: Get all greetings
app.get('/api/greetings', async (req, res) => {
    try {
        const greetings = await Greeting.find({ isActive: true });
        res.json({ 
            success: true,
            count: greetings.length,
            greetings: greetings.map(g => ({
                _id: g._id,
                content: g.content,
                isActive: g.isActive,
                createdAt: g.createdAt
            }))
        });
    } catch (error) {
        console.error('Error fetching greetings:', error);
        res.status(500).json({ 
            success: false,
            error: 'Server error' 
        });
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/greetings', (req, res) => {
    res.render('greetings');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Không tìm thấy trang</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #d32f2f, #c62828);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                h1 { font-size: 72px; margin: 0; }
                p { font-size: 24px; }
                a {
                    color: #ffd700;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>404</h1>
                <p>Không tìm thấy trang này!</p>
                <a href="/">← Quay về trang chủ</a>
            </div>
        </body>
        </html>
    `);
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Có lỗi xảy ra!');
});

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('🎊 ═══════════════════════════════════════════════════ 🎊');
    console.log('🧧  TRANG WEB CHÚC TẾT NGUYÊN ĐÁN - LUNAR NEW YEAR  🧧');
    console.log('🎊 ═══════════════════════════════════════════════════ 🎊');
    console.log('');
    console.log(`🌐  Server đang chạy tại: http://localhost:${PORT}`);
    console.log('🏮  Trang chủ: http://localhost:' + PORT);
    console.log('💌  Trang lời chúc: http://localhost:' + PORT + '/greetings');
    console.log('📡  API Random: http://localhost:' + PORT + '/api/greetings/random');
    console.log('📡  API All: http://localhost:' + PORT + '/api/greetings');
    console.log('');
    console.log('🛑  Nhấn Ctrl+C để dừng server');
    console.log('');
    console.log('🎋  Chúc mừng năm mới! An khang thịnh vượng! 🎋');
    console.log('');
});
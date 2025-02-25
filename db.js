const mongoose = require('mongoose');
// const mongoURL = "mongodb://localhost:27017/student";

const mongoURL = process.env.MONGO_URI;





mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected successfully'))
.catch(err => console.error('❌ MongoDB Atlas connection error:', err));

module.exports = mongoose;


require('dotenv').config();

mongoose.connect(mongoURL);

const db = mongoose.connection ;

db.on('connected', () => {
    console.log('Connected to mongoDB server');  
})

db.on('error', () => {
    console.log('MongoDB server error', err);
})

db.on('disconnected', () => {
    console.log('mongodb disconnected');
})

module.exports = db;

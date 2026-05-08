const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/love-meter';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const adminExists = await Admin.findOne({ username: process.env.ADMIN_USERNAME || 'admin' });
    if (!adminExists) {
        const admin = new Admin({
            username: process.env.ADMIN_USERNAME || 'admin',
            password: process.env.ADMIN_PASSWORD || 'adminpassword'
        });
        await admin.save();
        console.log(`Default admin created -> Username: ${admin.username}, Password: ${process.env.ADMIN_PASSWORD || 'adminpassword'}`);
    } else {
        console.log('Admin already exists.');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Setup error:', err);
    process.exit(1);
  });

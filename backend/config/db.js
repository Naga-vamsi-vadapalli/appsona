const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Vamsi:Vamsi%402000@backend.iytftve.mongodb.net/?retryWrites=true&w=majority&appName=backend');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

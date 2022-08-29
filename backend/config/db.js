const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://interacto_chat:iiest_IT20@cluster0.cka1hed.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });


        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
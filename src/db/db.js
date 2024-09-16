import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(`${process.env.DB_LOCAL_URL}/${DB_NAME}`);
        console.log(`\n MongoDB  connected !! DB HOST : ${connectionDB.connection.host}`);
    }
    catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}


export default connectDB;
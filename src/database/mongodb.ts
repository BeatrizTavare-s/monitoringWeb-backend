import mongoose from 'mongoose';    
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dbMonitoring';

mongoose.connect(uri);
export default mongoose
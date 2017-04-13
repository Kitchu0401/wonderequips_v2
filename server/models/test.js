import mongoose, { Schema } from 'mongoose';

export default mongoose.model(
    'test', 
    new Schema({ 
        message: String,
        datetime: { type: Date, default: Date.now  }
    })
);
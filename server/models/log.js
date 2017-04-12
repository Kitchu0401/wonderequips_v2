import mongoose, { Schema } from 'mongoose';

var logSchema = new Schema({
    type: String,
    published_date: { type: Date, default: Date.now  }
});

export default mongoose.model('log', logSchema);
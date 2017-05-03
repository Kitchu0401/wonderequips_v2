import mongoose from 'mongoose';

var logSchema = new mongoose.Schema({
    type: String,
    published_date: { type: Date, default: Date.now  }
});

export default mongoose.model('log', logSchema);
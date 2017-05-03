import mongoose from 'mongoose';

var messageSchema = new mongoose.Schema({
    content: String,
    published_date: { type: Date, default: Date.now  }
});

export default mongoose.model('message', messageSchema);
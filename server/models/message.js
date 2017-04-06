import mongoose, { Schema } from 'mongoose';

var messageSchema = new Schema({
    content: String,
    published_date: { type: Date, default: Date.now  }
});

export default mongoose.model('message', messageSchema);
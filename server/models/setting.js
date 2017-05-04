import mongoose from 'mongoose';

var settingSchema = new mongoose.Schema({
    name: String,
    value: String
});

export default mongoose.model('setting', settingSchema);
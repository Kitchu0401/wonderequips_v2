import mongoose from 'mongoose';

// {
//     "id" : 146,
//     "element" : 4,
//     "skill" : [ [ 0, 0, 0, 0, 2 ], [ 0, 0, 0, 0, 2 ], [ 0, 1, 0, 1, 1 ] ],
//     "name" : "루시페르",
//     "grade" : 5,
//     "type" : 0
// }

var champSchema = new mongoose.Schema({
    id: Number,
    element: Number,
    skill: [[]],
    name: String, 
    grade: Number,
    type: Number
});

export default mongoose.model('champ', champSchema);
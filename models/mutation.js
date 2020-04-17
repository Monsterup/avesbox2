const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const mutationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    rearingRecord: {
        type: Schema.Types.ObjectId,
        ref: 'RearingRecord',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

mutationSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Mutation', mutationSchema);
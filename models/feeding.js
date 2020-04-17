const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const feedingSchema = new Schema({
    number : {
        type: Number,
        required: true
    },
    storeTime: String,
    feed : {
        type: Schema.Types.ObjectId,
        ref: 'Feed',
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

feedingSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Feeding', feedingSchema);
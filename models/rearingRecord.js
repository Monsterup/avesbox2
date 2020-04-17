const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const rearingRecordSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mutation: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mutation'
        }
    ],
    feeding: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feeding'
        }
    ],
    growing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Growing'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rearing: {
        type: Schema.Types.ObjectId,
        ref: 'Rearing',
        required: true
    },
}, {timestamps: true});

rearingRecordSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('RearingRecord', rearingRecordSchema);
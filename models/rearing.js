const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const rearingSchema = new Schema({
    chickInDate: {
        type: Date,
        required: true
    },
    chickInWeight: {
        type: Number,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    otherInformation: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    },
    rearingRecord : [
        {
            type: Schema.Types.ObjectId,
            ref: 'RearingRecord'
        }
    ]
}, {timestamps:true});

rearingSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Rearing', rearingSchema);
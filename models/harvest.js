const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const harvestSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    totalWeight: {
        type: Number,
        required: true
    },
    numberLiveBird: {
        type: Number,
        required: true
    },
    averageWeight: {
        type: Number,
        required: true
    },
    rearing: {
        type: Schema.Types.ObjectId,
        ref: 'Rearing',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

harvestSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Harvest', harvestSchema);
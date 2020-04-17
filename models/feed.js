const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    producer: String,
    type: String,
    year: String,
    otherInformation: String,
    feeding: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feeding'
        }
    ],
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    feedStocks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FeedStock'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updater : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps:true});

feedSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Feed', feedSchema);
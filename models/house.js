const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    capacity: {
        type : Number,
        required: true
    },
    lat: String,
    lng: String,
    address: {
        type : String,
        required : true
    },
    otherInformation: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required : true
    },
    feedWarehouse: {
        type: Schema.Types.ObjectId,
        ref: 'FeedWarehouse',
    },
    rearing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rearing'
        }
    ],
    deviceRecord: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DeviceRecord'
        }
    ],

}, {timestamps: true});

houseSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('House', houseSchema);
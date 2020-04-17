const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNumber: {
        type: String,
        required: true
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House',
        required: true
    },
    deviceType: {
        type: Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    deviceRecord: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DeviceRecord'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

deviceSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Device', deviceSchema);
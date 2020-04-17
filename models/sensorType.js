const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const sensorTypeSchema = new Schema({
    name: {
        type: String,
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

sensorTypeSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('SensorType', sensorTypeSchema);
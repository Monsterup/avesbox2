const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const growingParamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
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
    }
}, {timestamps: true});

growingParamSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('GrowingParam', growingParamSchema);
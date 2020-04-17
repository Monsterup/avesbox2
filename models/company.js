const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true

    },
    companyManage: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Manage'
        }
    ],
    houses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'House'
        }
    ],
    feeds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feed'
        }
    ],
    feedWarehouses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FeedWarehouse'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

companySchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('Company', companySchema);
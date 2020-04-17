const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const feedWarehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    houses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'House'
        }
    ],
    feedStocks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FeedStock'
        }
    ],
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

feedWarehouseSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('FeedWarehouse', feedWarehouseSchema);
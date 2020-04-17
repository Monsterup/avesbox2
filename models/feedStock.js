const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const feedStockSchema = new Schema({
    number: Number,
    feedWarehouse:{
        type: Schema.Types.ObjectId,
        ref: 'FeedWarehouse'
    },
    feed:{
        type: Schema.Types.ObjectId,
        ref: 'Feed'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

feedStockSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('FeedStock', feedStockSchema);
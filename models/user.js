const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type: String,
        required : true,
    },
    address : String,
    phone : String,
    verified : {
        type: Boolean,
        default: false
    },
    verifyToken : {
        type: String,
        default: null
    },
    verifyTokenExpiry : {
        type: Date,
        default: null
    },
    resetPasswordToken : {
        type: String,
        default: null
    },
    resetPasswordTokenExpiry : {
        type: Date,
        default: null
    },
    tokenVersion: Number,
    google: String,
    facebook: String,
    type:{
        type: String,
        required : true,
    }, // owner / staff / sa
    createdDevices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdUser: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdManage : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Manage'
        }
    ],
    createdHouse : [
        {
            type: Schema.Types.ObjectId,
            ref: 'House'
        }
    ],
    createdCompany : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        }
    ],
    createdRearing : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Rearing'
        }
    ],
    createdRearingRecord : [
        {
            type: Schema.Types.ObjectId,
            ref: 'RearingRecord'
        }
    ],
    createdMutation : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mutation'
        }
    ],
    createdFeeding : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feeding'
        }
    ],
    createdFeed : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feed'
        }
    ],
    createdGrowing : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Growing'
        }
    ],
    createdGrowingParam : [
        {
            type: Schema.Types.ObjectId,
            ref: 'GrowingParam'
        }
    ],
    createdHarvest : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Harvest'
        }
    ],
    createdDeviceType : [
        {
            type: Schema.Types.ObjectId,
            ref: 'DeviceType'
        }
    ],
    createdDevice : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Device'
        }
    ],
    createdSensorType : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SensorType'
        }
    ],
    createdFeedWarehouse : [
        {
            type: Schema.Types.ObjectId,
            ref: 'FeedWarehouse'
        }
    ],
    createdFeedStock : [
        {
            type: Schema.Types.ObjectId,
            ref: 'FeedStock'
        }
    ],
    userManage : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Manage'
        }
    ],
    
}, {timestamps:true});
userSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});
module.exports = mongoose.model('User', userSchema);
const Device = require('../../models/device');
const User = require('../../models/user');
const {transformDevice} = require('./merge');

module.exports = {
    devices: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {serialNumber: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Device.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const devices = await Device.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                devices: devices.map(device => {
                    return transformDevice(device)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    device: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const devices = await Device.findOne({_id});
            if (!devices)
                throw new Error('Device not found');
            return transformDevice(devices)
        } catch (error) {
            console.log(error);
        }
    },
    createDevice: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let device = new Device({
            serialNumber: args.deviceInput.serialNumber,
            house: args.deviceInput.house,
            deviceType: args.deviceInput.deviceType,
            creator: req.userId
        });
        let createdDevice;
        try {
            const res = await device.save();
            createdDevice = transformDevice(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdDevices.push(device);
            await creator.save();
            return createdDevice;
        } catch (error) {
            throw error;
        }
    },
    updateDevice: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedDevice;
        try {
            const device = await Device.findOneAndUpdate({_id : args._id},{
                serialNumber: args.updateDeviceInput.serialNumber,
                house: args.updateDeviceInput.house,
                deviceType: args.updateDeviceInput.deviceType,
                creator: req.userId
            });
            updatedDevice = transformDevice(device);
            return updatedDevice;
        } catch (error) {
            throw error;
        }
    },
    deleteDevice: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Device.findOne(args);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
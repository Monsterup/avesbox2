const DeviceType = require('../../models/deviceType');
const User = require('../../models/user');
const {transformDeviceType} = require('./merge');

module.exports = {
    deviceTypes: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});               
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await DeviceType.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const deviceTypes = await DeviceType.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                devicesTypes: deviceTypes.map(deviceType => {
                    return transformDeviceType(deviceType)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    deviceType: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const deviceTypes = await DeviceType.findOne({_id});
            if(!deviceTypes)
                throw new Error('Device Type not found');
            return transformDeviceType(deviceTypes)
        } catch (error) {
            console.log(error);
        }
    },
    createDeviceType: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deviceType = new DeviceType({
            name: args.deviceTypeInput.name,
            creator: req.userId
        });
        let createdDeviceType;
        try {
            const res = await deviceType.save();
            createdDeviceType = transformDeviceType(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdDeviceType.push(deviceType);
            await creator.save();
            return createdDeviceType;
        } catch (error) {
            throw error;
        }
    },
};
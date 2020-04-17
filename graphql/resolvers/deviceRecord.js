const DeviceRecord = require('../../models/deviceRecord');
const SensorType = require('../../models/sensorType');
const Device = require('../../models/device');
const {transformDeviceRecord} = require('./merge');

module.exports = {
    // Device Records
    deviceRecords: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                // {value: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await DeviceRecord.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const deviceRecords = await DeviceRecord.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                devicesRecords: deviceRecords.map(deviceRecord => {
                    return transformDeviceRecord(deviceRecord)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Device Record
    deviceRecord: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const deviceRecord = await DeviceRecord.findOne({_id});
            if(!this.deviceRecord)
                throw new Error('Device Record not found');
            return transformDeviceRecord(deviceRecord)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createDeviceRecord: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deviceRecord = new DeviceRecord({
            value: args.deviceRecordInput.value,
            device: args.deviceRecordInput.device,
            sensorType: args.deviceRecordInput.sensorType,
        });
        let createdDeviceRecord;
        try {
            const res = await deviceRecord.save();
            createdDeviceRecord = transformDeviceRecord(res);
            const sensorType = await SensorType.findById(args.deviceRecordInput.sensorType);
            const device = await Device.findById(args.deviceRecordInput.device);
            if (!sensorType)
                throw new Error('sensorType not found');
            if (!device)
                throw new Error('device not found');
            sensorType.deviceRecord.push(deviceRecord);
            device.deviceRecord.push(deviceRecord);
            await sensorType.save();
            await device.save();
            return createdDeviceRecord;
        } catch (error) {
            throw error;
        }
    },
    // // Update
    // updateDeviceRecord: async (args, req) => {
    //     if (!req.isAuth)
    //         throw new Error('Unauthenticated');
    //     let updatedDeviceRecord;
    //     try {
    //         const deviceRecord = await DeviceRecord.findOneAndUpdate({_id : args._id},{
    //             date: args.updateDeviceRecordInput.date,
    //             age: args.updateDeviceRecordInput.age,
    //             device: args.updateDeviceRecordInput.device,
    //             creator: req.userId
    //         });
    //         updatedDeviceRecord = transformDeviceRecord(deviceRecord);
    //         return updatedDeviceRecord;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // // Delete
    // deleteDeviceRecord: async (args, req) => {
    //     if (!req.isAuth)
    //         throw new Error('Unauthenticated');
    //     let deleted;
    //     try {
    //         const res = await DeviceRecord.findOne(args);
    //         console.log(res);
    //         await res.delete();
    //         deleted = {deleted : true};
    //         return deleted;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
};
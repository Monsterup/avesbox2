const SensorType = require('../../models/sensorType');
const User = require('../../models/user');
const {transformSensorType} = require('./merge');

module.exports = {
    sensorTypes: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await SensorType.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const sensorTypes = await SensorType.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                sensorTypes: sensorTypes.map(sensorType => {
                    return transformSensorType(sensorType)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    sensorType: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const sensorTypes = await SensorType.findOne({_id})
            if(!sensorTypes)
                throw new Error('Sensor Type not found');
            return transformSensorType(sensorTypes)
        } catch (error) {
            console.log(error);
        }
    },
    createSensorType: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let sensorType = new SensorType({
            name: args.sensorTypeInput.name,
            creator: req.userId
        });
        let createdSensorType;
        try {
            const res = await sensorType.save();
            createdSensorType = transformSensorType(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdSensorType.push(sensorType);
            await creator.save();
            return createdSensorType;
        } catch (error) {
            throw error;
        }
    },
};
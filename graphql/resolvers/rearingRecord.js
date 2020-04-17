const RearingRecord = require('../../models/rearingRecord');
const Rearing = require('../../models/rearing');
const User = require('../../models/user');
const {transformRearingRecord} = require('./merge');

module.exports = {
    // Rearing Records
    rearingRecords: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {date: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                // {age: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await RearingRecord.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const rearingRecords = await RearingRecord.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                rearingRecords: rearingRecords.map(rearingRecord => {
                    return transformRearingRecord(rearingRecord)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Rearing Record
    rearingRecord: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const rearingRecord = await RearingRecord.findOne({_id})
            if(!this.rearingRecord)
                throw new Error('Rearing record not found');
            return transformRearingRecord(rearingRecord)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createRearingRecord: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let rearingRecord = new RearingRecord({
            date: args.rearingRecordInput.date,
            age: args.rearingRecordInput.age,
            rearing: args.rearingRecordInput.rearing,
            creator: req.userId
        });
        let createdRearingRecord;
        try {
            const res = await rearingRecord.save();
            createdRearingRecord = transformRearingRecord(res);
            const creator = await User.findById(req.userId);
            const rearing = await Rearing.findById(args.rearingRecordInput.rearing);
            if (!creator)
                throw new Error('user not found');
            creator.createdRearingRecord.push(rearingRecord);
            if (!rearing)
                throw new Error('user not found');
            rearing.rearingRecord.push(rearingRecord);
            await rearing.save();
            return createdRearingRecord;
        } catch (error) {
            throw error;
        }
    },
    // Update
    updateRearingRecord: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedRearingRecord;
        try {
            const rearingRecord = await RearingRecord.findOneAndUpdate({_id : args._id},{
                date: args.updateRearingRecordInput.date,
                age: args.updateRearingRecordInput.age,
                rearing: args.updateRearingRecordInput.rearing,
                creator: req.userId
            });
            updatedRearingRecord = transformRearingRecord(rearingRecord);
            return updatedRearingRecord;
        } catch (error) {
            throw error;
        }
    },
    // Delete
    deleteRearingRecord: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await RearingRecord.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
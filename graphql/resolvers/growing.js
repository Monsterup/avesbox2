const Growing = require('../../models/growing');
const User = require('../../models/user');
const RearingRecord = require('../../models/rearingRecord');
const GrowingParam = require('../../models/growingParam');
const {transformGrowing} = require('./merge');

module.exports = {
    // Growings
    growings: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                // {value: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Growing.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const growings = await Growing.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                growings: growings.map(growing => {
                    return transformGrowing(growing)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Growing
    growing: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const growing = await Growing.findOne({_id});
            if(!growing)
                throw new Error('Growing not found');
            return transformGrowing(growing)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createGrowing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let growing = new Growing({
            value: args.growingInput.value,
            rearingRecord: args.growingInput.rearingRecord,
            growingParam: args.growingInput.growingParam,
            creator: req.userId
        });
        let createdGrowing;
        try {
            const res = await growing.save();
            createdGrowing = transformGrowing(res);
            const creator = await User.findById(req.userId);
            const rearingRecord = await RearingRecord.findById(args.growingInput.rearingRecord);
            const growingParam = await GrowingParam.findById(args.growingInput.growingParam);
            if(!creator)
                throw new Error('user not found');
            console.log(creator);
            creator.createdGrowing.push(growing);
            await creator.save();
            if(!rearingRecord)
                throw new Error('rearing record not found');
            rearingRecord.growing.push(growing);
            await rearingRecord.save();
            if(!growingParam)
                throw new Error('growing param not found');
            growingParam.growing.push(growing);
            await growingParam.save();
            return createdGrowing;
        } catch (error) {
            throw error;
        }
    },
    // Update
    updateGrowing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedGrowing;
        try {
            const growing = await Growing.findOneAndUpdate({_id : args._id},{
                value: args.updateGrowingInput.value,
                growingParam: args.updateGrowingInput.growingParam,
                rearingRecord: args.updateGrowingInput.rearingRecord
            });
            updatedGrowing = transformGrowing(growing);
            return updatedGrowing;
        } catch (error) {
            throw error;
        }
    },
    // Delete
    deleteGrowing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Growing.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
const Feeding = require('../../models/feeding');
const User = require('../../models/user');
const RearingRecord = require('../../models/rearingRecord');
const {transformFeeding} = require('./merge');

module.exports = {
    // Feedings
    feedings: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});        
        try {
            const q = [
                // {number: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Feeding.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const feedings = await Feeding.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                feedings: feedings.map(feeding => {
                    return transformFeeding(feeding)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Feeding
    feeding: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const feeding = await Feeding.findOne({_id});
            if(!feeding)
                throw new Error('Feeding not found');
            return transformFeeding(feeding)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createFeeding: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let feeding = new Feeding({
            number: args.feedingInput.number,
            storeTime: args.feedingInput.storeTime,
            feed: args.feedingInput.feed,
            rearingRecord: args.feedingInput.rearingRecord,
            creator: req.userId
        });
        let createdFeeding;
        try {
            const res = await feeding.save();
            createdFeeding = transformFeeding(res);
            const creator = await User.findById(req.userId);
            const rearingRecord = await RearingRecord.findById(args.feedingInput.rearingRecord);
            if(!creator)
                throw new Error('user not found');
            creator.createdFeeding.push(feeding);
            await creator.save();
            if(!rearingRecord)
                throw new Error('rearing record not found');
            rearingRecord.feeding.push(feeding);
            await rearingRecord.save();
            return createdFeeding;
        } catch (error) {
            throw error;
        }
    },
    // Update
    updateFeeding: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedFeeding;
        try {
            const feeding = await Feeding.findOneAndUpdate({_id : args._id},{
                number: args.updateFeedingInput.number,
                storeTime: args.updateFeedingInput.storeTime,
                feed: args.updateFeedingInput.feed,
            });
            updatedFeeding = transformFeeding(feeding);
            return updatedFeeding;
        } catch (error) {
            throw error;
        }
    },
    // Delete
    deleteFeeding: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Feeding.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
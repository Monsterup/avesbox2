const Rearing = require('../../models/rearing');
const User = require('../../models/user');
const House = require('../../models/house');
const {transformRearing} = require('./merge');

module.exports = {
    rearings: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {chickInDate: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                // {chickInWeight: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                // {population: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {otherInformation: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Rearing.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const rearings = await Rearing.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                rearings: rearings.map(rearing => {
                    return transformRearing(rearing)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    rearing: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const rearing = await Rearing.findOne({_id});
            if(!rearing)
                throw new Error('Rearing not found');
            return transformRearing(rearing)
        } catch (error) {
            console.log(error);
        }
    },
    createRearing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let rearing = new Rearing({
            chickInDate: args.rearingInput.chickInDate,
            chickInWeight: args.rearingInput.chickInWeight,
            population: args.rearingInput.population,
            otherInformation: args.rearingInput.otherInformation,
            creator: req.userId
        });
        let createdRearing;
        try {
            const res = await rearing.save();
            createdRearing = transformRearing(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdRearing.push(rearing);
            await creator.save();
            const house = await House.findById(args.rearingInput.house);
            if (!house)
                throw new Error('house not found');
            house.rearing.push(rearing);
            await house.save();
            return createdRearing;
        } catch (error) {
            throw error;
        }
    },
    updateRearing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedRearing;
        try {
            const rearing = await Rearing.findOneAndUpdate({_id : args._id},{
                chickInDate: args.updateRearingInput.chickInDate,
                chickInWeight: args.updateRearingInput.chickInWeight,
                population: args.updateRearingInput.population,
                otherInformation: args.updateRearingInput.otherInformation,
                updater: req.userId
            });
            updatedRearing = transformRearing(rearing);
            return updatedRearing;
        } catch (error) {
            throw error;
        }
    },
    deleteRearing: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Rearing.findOne(args);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
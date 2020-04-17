const GrowingParam = require('../../models/growingParam');
const User = require('../../models/user');
const {transformGrowingParam} = require('./merge');

module.exports = {
    // GrowingParams
    growingParams: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {abbr: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {unit: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await GrowingParam.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const growingParams = await GrowingParam.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                growingParams: growingParams.map(growing => {
                    return transformGrowing(growing)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // GrowingParam
    growingParam: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const growingParam = await GrowingParam.findOne({_id})
            if(!growingParam)
                throw new Error('Growing param not found');
            return transformGrowingParam(growingParam)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createGrowingParam: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let growingParam = new GrowingParam({
            name: args.growingParamInput.name,
            abbr: args.growingParamInput.abbr,
            unit: args.growingParamInput.unit,
            creator: req.userId
        });
        let createdGrowingParam;
        try {
            const res = await growingParam.save();
            createdGrowingParam = transformGrowingParam(res);
            const creator = await User.findById(req.userId);
            if(!creator)
                throw new Error('user not found');
            creator.createdGrowingParam.push(growingParam);
            await creator.save();
            return createdGrowingParam;
        } catch (error) {
            throw error;
        }
    },
    // // Update
    // updateGrowingParam: async (args, req) => {
    //     if (!req.isAuth)
    //         throw new Error('Unauthenticated');
    //     let updatedGrowingParam;
    //     try {
    //         const growingParam = await GrowingParam.findOneAndUpdate({_id : args._id},{
    //             type: args.updateGrowingParamInput.type,
    //             name: args.updateGrowingParamInput.name,
    //             rearingRecord: args.updateGrowingParamInput.rearingRecord
    //         });
    //         updatedGrowingParam = transformGrowingParam(growingParam);
    //         return updatedGrowingParam;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // // Delete
    // deleteGrowingParam: async (args, req) => {
    //     if (!req.isAuth)
    //         throw new Error('Unauthenticated');
    //     let deleted;
    //     try {
    //         const res = await GrowingParam.findOne(args);
    //         console.log(res);
    //         await res.delete();
    //         deleted = {deleted : true};
    //         return deleted;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
};
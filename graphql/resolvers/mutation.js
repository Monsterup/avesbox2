const Mutation = require('../../models/mutation');
const User = require('../../models/user');
const RearingRecord = require('../../models/rearingRecord');
const {transformMutation} = require('./merge');

module.exports = {
    // Mutations
    mutations: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {type: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                // {number: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Mutation.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const mutations = await Mutation.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                mutations: mutations.map(mutation => {
                    return transformMutation(mutation)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    // Mutation
    mutation: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const mutation = await Mutation.findOne({_id});
            if(!this.mutation)
                throw new Error('Mutation not found');
            return transformMutation(mutation)
        } catch (error) {
            console.log(error);
        }
    },
    // Create
    createMutation: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let mutation = new Mutation({
            type: args.mutationInput.type,
            number: args.mutationInput.number,
            rearingRecord: args.mutationInput.rearingRecord,
            creator: req.userId
        });
        let createdMutation;
        try {
            const res = await mutation.save();
            createdMutation = transformMutation(res);
            const creator = await User.findById(req.userId);
            const rearingRecord = await RearingRecord.findById(args.mutationInput.rearingRecord);
            if(!creator)
                throw new Error('user not found');
            creator.createdMutation.push(mutation);
            await creator.save();
            if(!rearingRecord)
                throw new Error('rearing record not found');
            rearingRecord.mutation.push(mutation);
            await rearingRecord.save();
            return createdMutation;
        } catch (error) {
            throw error;
        }
    },
    // Update
    updateMutation: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedMutation;
        try {
            const mutation = await Mutation.findOneAndUpdate({_id : args._id},{
                type: args.updateMutationInput.type,
                number: args.updateMutationInput.number,
                rearingRecord: args.updateMutationInput.rearingRecord
            });
            updatedMutation = transformMutation(mutation);
            return updatedMutation;
        } catch (error) {
            throw error;
        }
    },
    // Delete
    deleteMutation: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Mutation.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};
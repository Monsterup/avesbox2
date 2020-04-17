const FeedWarehouse = require('../../models/feedWarehouse');
const User = require('../../models/user');
const Company = require('../../models/company');
const {transformFeedWarehouse} = require('./merge');

module.exports = {
    feedWarehouses: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await FeedWarehouse.find({company})
                .countDocuments();
            const feedWarehouses = await FeedWarehouse.find({company})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
            return {
                totalCount,
                feedWarehouses: feedWarehouses.map(feedWarehouse => {
                    return transformFeedWarehouse(feedWarehouse)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    feedWarehouse: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const feedWarehouse = await FeedWarehouse.findOne({_id});
            if(!feedWarehouse)
                throw new Error('Feed Warehouse not found');
            return transformFeedWarehouse(feedWarehouse)
        } catch (error) {
            console.log(error);
        }
    },
    createFeedWarehouse: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        let feedWarehouse = new FeedWarehouse({
            name: args.feedWarehouseInput.name,
            company: company._id,
            creator: req.userId
        });
        let createdFeedWarehouse;
        try {
            const res = await feedWarehouse.save();
            createdFeedWarehouse = transformFeedWarehouse(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdFeedWarehouse.push(feedWarehouse);
            await creator.save();
            company.feedWarehouses.push(feedWarehouse);
            await company.save();
            return createdFeedWarehouse;
        } catch (error) {
            throw error;
        }
    },
    updateFeedWarehouse: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedFeedWarehouse;
        try {
            const feedWarehouse = await FeedWarehouse.findOneAndUpdate({_id : args._id},{
                name: args.updateFeedWarehouseInput.name,
            });
            updatedFeedWarehouse = transformFeedWarehouse(feedWarehouse);
            return updatedFeedWarehouse;
        } catch (error) {
            throw error;
        }
    },
    deleteFeedWarehouse: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await FeedWarehouse.findOne(args);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
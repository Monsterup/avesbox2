const FeedStock = require('../../models/feedStock');
const Feed = require('../../models/feed');
const House = require('../../models/house');
const User = require('../../models/user');
const Company = require('../../models/company');
const {transformFeedStock} = require('./merge');

module.exports = {
    feedStocks: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            let feed;
            let house;
            if(args.keyword) {
                feed = await Feed.findOne({code: args.keyword});
                house = await House.findOne({name: args.keyword})
            }
            const q = [
                {feed: feed},
                {house: house}
            ]
            let totalCount = await FeedStock.find({creator})
                .and({$or: q})
                .skip(args.skip)
                .countDocuments();
            
            const feedStocks = await FeedStock.find({creator})
                .and({$or: q})
                .skip(args.skip)
                .limit(args.limit);
            
            
            return {
                totalCount,
                feedStocks: feedStocks.map(feedStock => {
                    return transformFeedStock(feedStock)
                })
            }

        } catch (error) {
            console.log(error);
        }
    },
    // feedStocksWarehouse: async (args, req) => {
    //     if (!req.isAuth)
    //         throw new Error('Unauthenticated');
    //     try {
    //         const feedWarehouse = await FeedWarehouse.findOne({_id: args.warehouseId});
    //         if (!feedWarehouse)
    //             throw new Error('Feed Warehouse not found');
    //         const feedStocks = await FeedStock.find({feedWarehouse});
    //         return feedStocks.map(feedStock => {
    //             return transformFeedStock(feedStock)
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    feedStock: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const feedStock = await FeedStock.findOne({_id});
            if (!feedStock)
                throw new Error('Feed Stock not found');
            return transformFeedStock(feedStock)
        } catch (error) {
            console.log(error);
        }
    },
    createFeedStock: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let feedStock = new FeedStock({
            number: args.feedStockInput.number,
            feed: args.feedStockInput.feed,
            house: args.feedStockInput.house,
            creator: req.userId
        });
        let createdFeedStock;
        try {
            const res = await feedStock.save();
            createdFeedStock = transformFeedStock(res);
            const creator = await User.findById(req.userId);
            const feed = await Feed.findById(args.feedStockInput.feed);
            const house = await House.findById(args.feedStockInput.house);
            if (!creator)
                throw new Error('user not found');
            if (!feed)
                throw new Error('feed not found');
            if (!house)
                throw new Error('house not found');
            creator.createdFeedStock.push(feedStock);
            feed.feedStocks.push(feedStock);
            house.feedStocks.push(feedStock);
            await creator.save();
            await feed.save();
            await house.save();
            return createdFeedStock;
        } catch (error) {
            throw error;
        }
    },
    updateFeedStock: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedFeedStock;
        try {
            const feedStock = await FeedStock.findOneAndUpdate({_id : args._id},{
                number: args.updateFeedStockInput.number,
                feed: args.updateFeedStockInput.feed,
                feedWarehouse: args.updateFeedStockInput.feedWarehouse
            });
            updatedFeedStock = transformFeedStock(feedStock);
            return updatedFeedStock;
        } catch (error) {
            throw error;
        }
    },
    deleteFeedStock: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await FeedStock.findOne(args);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
const Feed = require('../../models/feed');
const User = require('../../models/user');
const Company = require('../../models/company');
const {transformFeed} = require('./merge');

module.exports = {
    feeds: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        try {
            const q = [
                {code: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {producer: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                // {year: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {type: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            const totalCount = await Feed.find({company: company._id})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const feeds = await Feed.find({company: company._id})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);

            return {
                totalCount : totalCount,
                feeds : feeds.map(feed => {
                    return transformFeed(feed)
                }),
            };
        } catch (error) {
            console.log(error);
        }
    },
    feed: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const feed = await Feed.findOne({_id});
            if (!feed)
                throw new Error('Feed not found');
            return transformFeed(feed)
        } catch (error) {
            console.log(error);
        }
    },
    createFeed: async (args, req) => {
      console.log(req.res);
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        let feed = new Feed({
            code: args.feedInput.code,
            producer: args.feedInput.producer,
            company: company._id,
            type: args.feedInput.type,
            year: args.feedInput.year,
            otherInformation: args.feedInput.otherInformation,
            creator: req.userId
        });
        let createdFeed;
        try {
            const res = await feed.save();
            createdFeed = transformFeed(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdFeed.push(feed);
            await creator.save();
            return createdFeed;
        } catch (error) {
            throw error;
        }
    },
    updateFeed: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedFeed;
        try {
            const feed = await Feed.findOneAndUpdate({_id: args._id}, {
                code: args.updateFeedInput.code,
                producer: args.updateFeedInput.producer,
                type: args.updateFeedInput.type,
                year: args.updateFeedInput.year,
                otherInformation: args.updateFeedInput.otherInformation,
                updater: req.userId
            });
            updatedFeed = transformFeed(feed);
            return updatedFeed;
        } catch (error) {
            throw error;
        }
    },
    deleteFeed: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Feed.findOne(args);
            await res.delete();
            deleted = {deleted: true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
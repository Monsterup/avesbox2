const House = require('../../models/house');
const User = require('../../models/user');
const Company = require('../../models/company');
const FeedWarehouse = require('../../models/feedWarehouse');
const {transformHouse} = require('./merge');

module.exports = {
    // houses
    houses: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {address: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            const totalCount = await House.find({company: company._id})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const houses = await House.find({company: company._id})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
            return {
                totalCount : totalCount,
                houses : houses.map(house => {
                    return transformHouse(house)
                }),
            };
        } catch (error) {
            throw error;
        }
    },
    // house
    house: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const house = await House.findOne({_id});
            if(!house)
                throw new Error('House not Found');
            return transformHouse(house)
        } catch (error) {
            throw error;
        }
    },
    // create house (buat resolver company dulu)
    createHouse: async (args, req) => {
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        const company = await Company.findOne({creator: req.userId});
        let house = new House({
            name: args.houseInput.name,
            capacity: args.houseInput.capacity,
            lat: args.houseInput.lat,
            lng: args.houseInput.lng,
            address: args.houseInput.address,
            otherInformation: args.houseInput.otherInformation,
            company: company._id,
            creator: req.userId
        });
        let createdHouse;
        try {
            const res = await house.save();
            createdHouse = transformHouse(res);
            const creator = await User.findById(req.userId);
            if(!creator)
                throw new Error('user not found');
            creator.createdHouse.push(house);
            await creator.save();
            return createdHouse;
        } catch (error) {
            throw error;
        }
    },
    // update house
    updateHouse: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedHouse;
        try {
            const house = await House.findOneAndUpdate({_id : args._id},{
                name: args.updateHouseInput.name,
                capacity: args.updateHouseInput.capacity,
                lat: args.updateHouseInput.lat,
                lng: args.updateHouseInput.lng,
                address: args.updateHouseInput.address,
                feedWarehouse: args.updateHouseInput.feedWarehouse,
                otherInformation: args.updateHouseInput.otherInformation,
                creator: req.userId
            });
            updatedHouse = transformHouse(house);
            return updatedHouse;
        } catch (error) {
            throw error;
        }
    },
    // delete house
    deleteHouse: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await House.findOne(args);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
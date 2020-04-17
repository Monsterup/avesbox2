const User = require('../../models/user');
const Device = require('../../models/device');
const DeviceType = require('../../models/deviceType');
const SensorType = require('../../models/sensorType');
const Feed = require('../../models/feed');
const FeedStock = require('../../models/feedStock');
const FeedWarehouse = require('../../models/feedWarehouse');
const House = require('../../models/house');
const Company = require('../../models/company');
const Rearing = require('../../models/rearing');
const RearingRecord = require('../../models/rearingRecord');
const DeviceRecord = require('../../models/deviceRecord');
const Mutation = require('../../models/mutation');
const Feeding = require('../../models/feeding');
const Growing = require('../../models/growing');
const GrowingParam = require('../../models/growingParam');
const Harvest = require('../../models/harvest');
const {dateToString} = require('../../helpers/date');

const transformUser = user => {
    return {
        ...user._doc,
        password : null,
        createdAt: dateToString(user.createdAt),
        updatedAt: dateToString(user.updatedAt),
        createdUser: users.bind(this, user.createdUser),
        createdHouse: houses.bind(this, user.createdHouse),
        createdCompany: companys.bind(this, user.createdCompany),
        createdRearing: rearings.bind(this, user.createdRearing),
        createdRearingRecord: rearingRecords.bind(this, user.createdRearingRecord),
        createdFeed: feeds.bind(this, user.createdFeed),
        createdDeviceType: deviceTypes.bind(this, user.createdDeviceType),
        createdDevice: device.bind(this, user.createdDevice),
        createdSensorType: sensorType.bind(this, user.createdSensorType),
        createdMutation: mutations.bind(this, user.createdMutation),
        createdFeeding: feedings.bind(this, user.createdFeeding),
        createdGrowing: growings.bind(this, user.createdGrowing),
        createdGrowingParam: growingParams.bind(this, user.createdGrowingParam),
        createdFeedWarehouse: feedWarehouses.bind(this, user.createdFeedWarehouse),
        createdFeedStock: feedStocks.bind(this, user.createdFeedStock)
    }
};
const user = async userIds => {
    try {
        const users = await User.findById(userIds);
        return transformUser(users);
    } catch (error) {
        throw error
    }
};
const users = async userIds => {
    try {
        const users = await User.find({_id: {$in: userIds}});
        return users.map(user => {
            return transformDevice(user)
        })
    } catch (error) {
        throw error
    }
};
const transformDevice = device => {
    return {
        ...device._doc,
        createdAt: dateToString(device.createdAt),
        updatedAt: dateToString(device.updatedAt),
        creator: user.bind(this, device.creator)
    }
};
const device = async deviceIds => {
    try {
        const devices = await Device.find({_id: {$in: deviceIds}});
        return devices.map(device => {
            return transformDevice(device)
        })
    } catch (error) {
        throw error;
    }
};
const devices = async deviceIds => {
    try {
        const devices = await Device.findById(deviceIds);
        return devices
    } catch (error) {
        throw error;
    }
};
const transformDeviceType = deviceType => {
    return {
        ...deviceType._doc,
        createdAt: dateToString(deviceType.createdAt),
        updatedAt: dateToString(deviceType.updatedAt),
        creator: user.bind(this, deviceType.creator)
    }
};
const deviceTypes = async deviceTypeIds => {
    try {
        const deviceTypes = await DeviceType.find({_id: {$in: deviceTypeIds}});
        return deviceTypes.map(deviceType => {
            return transformDevice(deviceType)
        })
    } catch (error) {
        throw error;
    }
};
const transformFeed = feed => {
    return {
        ...feed._doc,
        createdAt: dateToString(feed.createdAt),
        updatedAt: dateToString(feed.updatedAt),
        feeding: feedings.bind(this, feed.feeding),
        company: company.bind(this, feed.company),
        feedStock: feedStocks.bind(this, feed.feedStock),
        creator: user.bind(this, feed.creator)
    }
};
const feed = async feedIds => {
    try {
        const feeds = await Feed.findById(feedIds);
        return feeds;
    } catch (error) {
        throw error;
    }
};
const feeds = async feedIds => {
    try {
        const feeds = await Feed.find({_id: {$in: feedIds}});
        return feeds.map(feed => {
            return transformFeed(feed)
        })
    } catch (error) {
        throw error;
    }
};
const transformHouse = house => {
    return {
        ...house._doc,
        createdAt: dateToString(house.createdAt),
        updatedAt: dateToString(house.updatedAt),
        company: company.bind(this, house.company),
        creator: user.bind(this, house.creator)
    }
}
const houses = async houseIds => {
    try {
        const houses = await House.find({_id: {$in: houseIds}});
        return houses.map(house => {
            return transformHouse(house)
        })
    } catch (error) {
        throw error;
    }
};
const house = async houseIds => {
    try {
        const houses = await House.findById(houseIds);
        return houses;
    } catch (error) {
        throw error;
    }
};
const transformCompany = company => {
    return {
        ...company._doc,
        createdAt: dateToString(company.createdAt),
        updatedAt: dateToString(company.updatedAt),
        feed: feeds.bind(this, company.feed),
        feedWarehouses: feedWarehouses.bind(this, company.feedWarehouse),
        creator: user.bind(this, company.creator)
    }
}
const companys = async companyIds => {
    try {
        const companies = await Company.find({_id: {$in: companyIds}});
        return companies.map(company => {
            return transformCompany(company)
        })
    } catch (error) {
        throw error;
    }
};
const company = async companyIds => {
    try {
        const companies = await Company.findById(companyIds);
        return companies;
    } catch (error) {
        throw error;
    }
};
// MERGE REARING
const transformRearing = rearing => {
    return {
        ...rearing._doc,
        createdAt: dateToString(rearing.createdAt),
        updatedAt: dateToString(rearing.updatedAt),
        rearingRecord: rearingRecords.bind(this, rearing.rearingRecord),
        harvest: harvests.bind(this, rearing.harvest),
        creator: user.bind(this, rearing.creator)
    }
}
const rearings = async rearingIds => {
    try {
        const rearings = await Rearing.find({_id: {$in: rearingIds}});
        return rearings.map(rearing => {
            return transformRearing(rearing)
        })
    } catch (error) {
        throw error;
    }
};
const rearing = async rearingIds => {
    try {
        const rearings = await Rearing.findById(rearingIds);
        return rearings;
    } catch (error) {
        throw error;
    }
};
const transformRearingRecord = rearingRecord => {
    return {
        ...rearingRecord._doc,
        createdAt: dateToString(rearingRecord.createdAt),
        updatedAt: dateToString(rearingRecord.updatedAt),
        rearing: rearing.bind(this, rearingRecord.rearing),
        mutation: mutations.bind(this, rearingRecord.mutation),
        feeding: feedings.bind(this, rearingRecord.feeding),
        growing: growings.bind(this, rearingRecord.growing),
        creator: user.bind(this, rearingRecord.creator)
    }
}
const rearingRecord = async rearingRecordIds => {
    try {
        const rearingRecord = await RearingRecord.findById(rearingRecordIds);
        return rearingRecord;
    } catch (error) {
        throw error;
    }
};
const rearingRecords = async rearingRecordIds => {
    try {
        const rearingRecords = await RearingRecord.find({_id: {$in: rearingRecordIds}});
        return rearingRecords.map(rearingRecord => {
            return transformRearing(rearingRecord)
        })
    } catch (error) {
        throw error;
    }
};
const transformDeviceRecord = deviceRecord => {
    return {
        ...deviceRecord._doc,
        createdAt: dateToString(deviceRecord.createdAt),
        updatedAt: dateToString(deviceRecord.updatedAt),
        device: devices.bind(this, deviceRecord.device),
        sensorType: sensorTypes.bind(this, deviceRecord.sensorType),
    }
}
const deviceRecord = async deviceRecordIds => {
    try {
        const deviceRecords = await DeviceRecord.find({_id: {$in: deviceRecordIds}});
        return deviceRecords.map(deviceRecord => {
            return transformRearing(deviceRecord)
        })
    } catch (error) {
        throw error;
    }
};
const transformSensorType = sensorType => {
    return {
        ...sensorType._doc,
        createdAt: dateToString(sensorType.createdAt),
        updatedAt: dateToString(sensorType.updatedAt),
        deviceRecord: deviceRecord.bind(this, sensorType.deviceRecord),
        creator: user.bind(this, sensorType.creator)
    }
};
const sensorType = async sensorTypeIds => {
    try {
        const sensorTypes = await SensorType.find({_id: {$in: sensorTypeIds}});
        return sensorTypes.map(sensorType => {
            return transformDevice(sensorType)
        })
    } catch (error) {
        throw error;
    }
};
const sensorTypes = async sensorTypeIds => {
    try {
        const sensorTypes = await SensorType.findById(sensorTypeIds);
        return sensorTypes;
    } catch (error) {
        throw error;
    }
};
// MERGE MUTATION
const transformMutation = mutation => {
    return {
        ...mutation._doc,
        createdAt: dateToString(mutation.createdAt),
        updatedAt: dateToString(mutation.updatedAt),
        rearingRecord: rearingRecord.bind(this, mutation.rearingRecord),
        creator: user.bind(this, mutation.creator)
    }
}
const mutations = async mutationIds => {
    try {
        const mutations = await Mutation.find({_id: {$in: mutationIds}});
        return mutations.map(mutation => {
            return transformMutation(mutation)
        });
    } catch (error) {
        
    }
}
// MERGE FEEDING
const transformFeeding = feeding => {
    return {
        ...feeding._doc,
        createdAt: dateToString(feeding.createdAt),
        updatedAt: dateToString(feeding.updatedAt),
        rearingRecord: rearingRecord.bind(this, feeding.rearingRecord),
        feed: feed.bind(this, feeding.feed),
        creator: user.bind(this, feeding.creator)
    }
}
const feedings = async feedingIds => {
    try {
        const feedings = await Feeding.find({_id: {$in: feedingIds}});
        return feedings.map(feeding => {
            return transformFeeding(feeding)
        });
    } catch (error) {
        
    }
}
// MERGE GROWING
const transformGrowing = growing => {
    return {
        ...growing._doc,
        createdAt: dateToString(growing.createdAt),
        updatedAt: dateToString(growing.updatedAt),
        growingParam: growingParam.bind(this, growing.growingParam),
        rearingRecord: rearingRecord.bind(this, growing.rearingRecord),
        creator: user.bind(this, growing.creator)
    }
}
const growings = async growingIds => {
    try {
        const growings = await Growing.find({_id: {$in: growingIds}});
        return growings.map(growing => {
            return transformFeeding(growing)
        });
    } catch (error) {
        
    }
}
// MERGE GROWING PARAM
const transformGrowingParam = growingParam => {
    return {
        ...growingParam._doc,
        createdAt: dateToString(growingParam.createdAt),
        updatedAt: dateToString(growingParam.updatedAt),
        growing: growings.bind(this, growingParam.growing),
        creator: user.bind(this, growingParam.creator)
    }
}
const growingParams = async growingParamIds => {
    try {
        const growingParams = await GrowingParam.find({_id: {$in: growingParamIds}});
        return growingParams.map(growingParam => {
            return transformFeeding(growingParam)
        });
    } catch (error) {
        
    }
}
const growingParam = async growingParamIds => {
    try {
        const growingParams = await GrowingParam.findById(growingParamIds);
        return growingParams;
    } catch (error) {
        
    }
}
// MERGE HARVEST
const transformHarvest = harvest => {
    return {
        ...harvest._doc,
        createdAt: dateToString(harvest.createdAt),
        updatedAt: dateToString(harvest.updatedAt),
        rearing: rearing.bind(this, harvest.rearing),
        creator: user.bind(this, harvest.creator)
    }
}
const harvests = async harvestIds => {
    try {
        const harvests = await Harvest.find({_id: {$in: harvestIds}});
        return harvests.map(harvest => {
            return transformFeeding(harvest)
        });
    } catch (error) {
        
    }
}
const transformFeedWarehouse = feedWarehouse => {
    return {
        ...feedWarehouse._doc,
        createdAt: dateToString(feedWarehouse.createdAt),
        updatedAt: dateToString(feedWarehouse.updatedAt),
        company: company.bind(this, feedWarehouse.company),
        feedStock: feedStocks.bind(this, feedWarehouse.feedStock),
        creator: user.bind(this, feedWarehouse.creator)
    }
};
const feedWarehouse = async feedWarehouseIds => {
    try {
        const feedWarehouses = await FeedWarehouse.findById(feedWarehouseIds);
        return feedWarehouses;
    } catch (error) {
        throw error;
    }
};
const feedWarehouses = async feedWarehouseIds => {
    try {
        const feedWarehouses = await FeedWarehouse.findById(feedWarehouseIds);
        return feedWarehouses.map(feedWarehouse => {
            return transformFeedWarehouse(feedWarehouse)
        });
    } catch (error) {
        throw error;
    }
};
const transformFeedStock = feedStock => {
    return {
        ...feedStock._doc,
        createdAt: dateToString(feedStock.createdAt),
        updatedAt: dateToString(feedStock.updatedAt),
        feed: feed.bind(this, feedStock.feed),
        feedWarehouse: feedWarehouse.bind(this, feedStock.feedWarehouse),
        creator: user.bind(this, feedStock.creator)
    }
};
const feedStocks = async feedStockIds => {
    try {
        const feedStocks = await FeedStock.findById(feedStockIds);
        return feedStocks.map(feedStock => {
            return transformFeed(feedStock)
        });
    } catch (error) {
        throw error;
    }
};

exports.transformUser = transformUser;
exports.transformDevice = transformDevice;
exports.transformDeviceType = transformDeviceType;
exports.transformFeed = transformFeed;
exports.transformFeeding = transformFeeding;
exports.transformHouse = transformHouse;
exports.transformCompany = transformCompany;
exports.transformRearing = transformRearing;
exports.transformRearingRecord = transformRearingRecord;
exports.transformDeviceRecord = transformDeviceRecord;
exports.transformSensorType = transformSensorType;
exports.transformMutation = transformMutation;
exports.transformGrowing = transformGrowing;
exports.transformGrowingParam = transformGrowingParam;
exports.transformHarvest = transformHarvest;
exports.transformFeedWarehouse = transformFeedWarehouse;
exports.transformFeedStock = transformFeedStock;
// exports.transform = transform;

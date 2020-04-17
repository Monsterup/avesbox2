const userResolver = require('./user');
const deviceResolver = require('./device');
const deviceRecordResolver = require('./deviceRecord');
const deviceTypeResolver = require('./deviceType');
const sensorTypeResolver = require('./sensorType');
const feedResolver = require('./feed');
const houseResolver = require('./house');
const companyResolver = require('./company');
const rearingResolver = require('./rearing');
const rearingRecordResolver = require('./rearingRecord');
const mutationResolver = require('./mutation');
const feedingResolver = require('./feeding');
const growingResolver = require('./growing');
const growingParamResolver = require('./growingParam');
const harvestResolver = require('./harvest');
const feedWarehouseResolver = require('./feedWarehouse');
const feedStockResolver = require('./feedStock');

const rootResolver = {
    ...userResolver,
    ...deviceResolver,
    ...deviceRecordResolver,
    ...deviceTypeResolver,
    ...sensorTypeResolver,
    ...feedResolver,
    ...houseResolver,
    ...companyResolver,
    ...rearingResolver,
    ...rearingRecordResolver,
    ...mutationResolver,
    ...feedingResolver,
    ...growingResolver,
    ...growingParamResolver,
    ...harvestResolver,
    ...feedWarehouseResolver,
    ...feedStockResolver
}

module.exports = rootResolver;
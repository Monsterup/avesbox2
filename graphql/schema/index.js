const {buildSchema} = require('graphql');
const User = require('./user');
const Manage = require('./manage');
const Company = require('./company');
const House = require('./house');
const Rearing = require('./rearing');
const RearingRecord = require('./rearingRecord');
const Mutation = require('./mutation');
const Feeding = require('./feeding');
const Feed = require('./feed');
const Growing = require('./growing');
const GrowingParam = require('./growingParam');
const Harvest = require('./harvest');
const DeviceType = require('./deviceType');
const Device = require('./device');
const DeviceRecord = require('./deviceRecord');
const SensorType = require('./sensorType');
const feedStock = require('./feedStock');
const feedWarehouse = require('./feedWarehouse');

const types = [];
const queries = [];
const mutations = [];
const inputs = [];

const schemas = [User, Manage, Company, House, Rearing, 
    RearingRecord, Mutation, Feeding, Feed, Growing, GrowingParam, 
    Harvest, DeviceType, Device, DeviceRecord, SensorType, 
    feedStock, feedWarehouse];

schemas.forEach(s => {
    types.push(s.types);
    queries.push(s.queries);
    mutations.push(s.mutations);
    inputs.push(s.inputs);
})

const globalSchema = `
    ${types.join('\n')}    
    type RootQuery {
        ${queries.join('\n')}
    }
    ${inputs.join('\n')}
    type RootMutation{
        ${mutations.join('\n')}
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }`;
module.exports = buildSchema(globalSchema);
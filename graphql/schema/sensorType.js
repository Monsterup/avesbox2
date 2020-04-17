module.exports = {
    types: `
        type SensorType{
            _id: ID!
            name: String!
            deviceRecord: [DeviceRecord!]
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type SensorTypes{
            totalCount: Int!
            sensorTypes: [SensorType!]
        }

        type CheckDeleteSensorType{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        sensorTypes(keyword: String, limit: Int, skip: Int): SensorTypes
        sensorType(_id: ID!): SensorType
        `
    ,
    mutations: `
        createSensorType(sensorTypeInput: SensorTypeInput): SensorType
        updateSensorType(_id: ID!, updateSensorTypeInput: UpdateSensorTypeInput): SensorType
        deleteSensorType(_id: ID!): CheckDeleteSensorType
    `
    ,
    inputs: `
        input SensorTypeInput{
            name: String!
        }
        input UpdateSensorTypeInput{
            name: String
        }
    `
};
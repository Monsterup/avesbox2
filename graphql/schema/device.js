module.exports = {
    types: `
        type Device{
            _id: ID!
            serialNumber: String!
            house: House!
            deviceType: DeviceType!
            deviceRecord: [DeviceRecord!]
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Devices{
            totalCount: Int!
            devices: [Device!]
        }

        type CheckDeleteDevice{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        devices(keyword: String, limit: Int, skip: Int): Devices
        device(_id: ID!): Device
    `
    ,
    mutations: `
        createDevice(deviceInput: DeviceInput): Device
        updateDevice(_id: ID!, updateDeviceInput: UpdateDeviceInput): Device
        deleteDevice(_id: ID!): CheckDeleteDevice
    `
    ,
    inputs: `
        input DeviceInput{
            serialNumber: String!
            house: String!
            deviceType: String!
        }
        input UpdateDeviceInput{
            serialNumber: String
            house: String
        }
    `
};
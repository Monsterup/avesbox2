module.exports = {
    types: `
        type RearingRecord{
            _id: ID!
            date: String!
            age: Int!
            mutation: [Mutation!]
            feeding: [Feeding!]
            growing: [Growing!]
            creator: User!
            rearing: Rearing!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type RearingRecords{
            totalCount: Int!
            rearingRecords: [RearingRecord!]
        }

        type CheckDeleteRearingRecord{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        rearingRecords(keyword: String, limit: Int, skip: Int): RearingRecords
        rearingRecord(_id: ID!): RearingRecord
    `
    ,
    mutations: `
        createRearingRecord(rearingRecordInput: RearingRecordInput): RearingRecord
        updateRearingRecord(_id: ID!, updateRearingRecordInput: UpdateRearingRecordInput): RearingRecord
        deleteRearingRecord(_id: ID!): CheckDeleteRearingRecord
    `
    ,
    inputs: `
        input RearingRecordInput{
            date: String!
            age: Int!
            rearing: String!
        }
        input UpdateRearingRecordInput{
            date: String
            age: Int
            rearing: String
        }
    `
};
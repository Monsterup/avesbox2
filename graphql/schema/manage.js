module.exports = {
    types: `
        type Manage{
            _id: ID!
            company: Company!
            user: User!
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type CheckDeleteManage{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        manages: [Manage!]!
        manage(_id: ID!): Manage
    `
    ,
    mutations: `
        createManage(manageInput: ManageInput): Manage
        updateManage(_id: ID!, updateManageInput: UpdateManageInput): Manage
        deleteManage(_id: ID!): CheckDeleteManage
    `
    ,
    inputs: `
        input ManageInput{
            company: String!
            user: String!
            creator: String!
        }
        input UpdateManageInput{
            company: String
            user: String
            creator: String
        }
    `
};
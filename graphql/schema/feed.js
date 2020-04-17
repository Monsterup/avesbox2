module.exports = {
    types: `
        type Feed{
            _id: ID!
            code: String!
            type: String
            company: Company
            producer: String
            year: String
            otherInformation: String
            feeding: [Feeding!]
            feedStocks: [FeedStock!]
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }
        
        type Feeds {
            totalCount : Int!
            feeds : [Feed!]
        }

        type CheckDeleteFeed{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        feeds(keyword : String, limit : Int, skip : Int): Feeds
        feed(_id: ID!): Feed
    `
    ,
    mutations: `
        createFeed(feedInput: FeedInput): Feed
        updateFeed(_id: String!, updateFeedInput: UpdateFeedInput): Feed
        deleteFeed(_id: String!): CheckDeleteFeed
    `
    ,
    inputs: `
        input FeedInput{
            code: String!
            type: String!
            year: String!
            producer: String
            otherInformation: String
        }
        input UpdateFeedInput{
            code: String
            type: String
            year: String
            producer: String
            otherInformation: String
        }
    `
};
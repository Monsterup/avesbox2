module.exports = {
    types: `
        type User{
            _id: ID!
            name: String!
            username: String!
            email: String!
            password: String
            address: String
            phone: String
            type: String!
            creator: User!
            verified: Boolean!
            verifyToken: String!
            verifyTokenExpiry: String!
            resetPasswordToken: String!
            resetPasswordTokenExpiry: String!
            tokenVersion: Int!
            createdUser: [User!]
            createdManage: [Manage!]
            createdHouse: [House!]
            createdCompany: [Company!]
            createdRearing: [Rearing!]
            createdRearingRecord: [RearingRecord!]
            createdMutation: [Mutation!]
            createdFeeding: [Feeding!]
            createdFeed: [Feed!]
            createdGrowing: [Growing!]
            createdGrowingParam: [GrowingParam!]
            createdHarvest: [Harvest!]
            createdDeviceType: [DeviceType!]
            createdDevice: [Device!]
            createdSensorType: [SensorType!]
            createdFeedWarehouse: [FeedWarehouse!]
            createdFeedStock: [FeedStock!]
            userManage: [Manage!]
            google: String
            facebook: String
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type Users{
            totalCount: Int!
            users: [User!]!
        }
        
        type AuthData {
            userId: ID!
            token: String!
            email: String!
            name: String!
            createdAt : String!
            tokenExpiration: Int!
        }

        type OAuthData {
            email: String!
            registered: Boolean!
        }
        
        type CheckReg{
            registered : Boolean!
        }
        
        type CheckLogout{
            signedOut : Boolean!
        }

        type CheckDeleteUser{
            deleted: Boolean!
        }

        type SentData{
            email: String!
            token: String!
            tokenExpiry: String!
        }
    `
    ,
    queries:`
        getRedis(key:String!): String
        users: Users!
        user(_id: ID!): User
        checkEmail(email : String!) : CheckReg
        getProfile: User!
    `
    ,
    mutations: `
        logout: CheckLogout!
        login(email : String!, password: String!): AuthData!
        loginOAuth(type:String!, token:String!): OAuthData!
        setRedis(key:String!, value: String!): Boolean!
        createUser(userInput: UserInput): User
        register(registerInput: RegisterInput): User
        registerSocmed(registerInput: RegisterInput): User
        updateUser(updateUserInput: UpdateUserInput): User
        deleteUser(_id: ID!): CheckDeleteUser
        sendLinkForgetPassword(email: String!): SentData!
        sendLinkVerifyEmail(email: String!): SentData!
        revokeRefreshToken(_id: ID!): Boolean!
    `
    ,
    inputs: `
        input UserInput{
            address: String!
            username: String!
            email: String!
            password: String!
            phone: String
            name: String
            type: String!
        }
        input RegisterInput{
            email: String!
            password: String!
            name: String!
            username: String!
            address: String
            phone: String
            type: String!
            companyName: String!
            companyType: String!
            token: String
            oauthType: String
        }
        input UpdateUserInput{
            address: String
            username: String
            email: String
            password: String
            phone: String
            name: String
        }
    `
};
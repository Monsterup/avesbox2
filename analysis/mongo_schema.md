@startuml

' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity User{
    * _id : ID
    --
    * name : String
    * username : String <<unique>>
    * email : String
    * password : String
    address : String
    phone : String
    type : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * creator : User
    createdUser : [User]
    createdManage : [Manage]
    createdHouse : [House]
    createdCompany : [Company]
    createdRearing : [Rearing]
    createdRearingRecord : [RearingRecord]
    createdMutation : [Mutation]
    createdFeedingRecord : [FeedingRecord]
    createdFeed : [Feed]
    createdGrowingRecord : [GrowingRecord]
    createdGrowingParam : [GrowingParam]
    createdHarvest : [Harvest]
    createdDeviceType : [DeviceType]
    createdDevice : [Device]
    createdSensor : [Sensor]
    createdSensorType : [SensorType]
    userManage : [Manage]
}

entity Manage {
    * _id : ID
    --
    * company : Company
    * user : User
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * creator : User
}

entity Company {
    _id : ID
    --
    * name : String
    * type : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    creator : User
    companyManage : [Manage]
    feedWarehouse : [FeedWarehouse]
}

' company type "perusahaan_kemitraan","peternakan_mandiri"

entity FeedWarehouse {
    _id : ID
    --
    * name : String
    * houses : [House]
    * feedStocks : [FeedStock]
    * company : Company
    * creator : User
}

entity House {
    * _id : ID
    --
    * name : String
    * capacity : Number
    * lat : Number
    * lng : Number
    * address : String
    otherInformation : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * creator : User
    * company : Company
    rearing : [Rearing]
    deviceRecord : [DeviceRecord]
    feedWarehouse : FeedWarehouse
}

User ||..o{ Manage
Company ||..o{ Manage
Company ||..|{ House
User ||..o{ House
User ||..o{ User

entity Rearing {
    * _id : ID
    --
    * chickInDate : Date
    * chickInWeight : Number
    * population : Number
    otherInformation : String
    * creator : User
    * house : House
    rearingRecord : [RearingRecord]
}

User ||..o{ Rearing
House ||..o{ Rearing

entity RearingRecord {
    * _id : ID
    --
    * date : Date
    * age : Number
    mutation : [Mutation]
    feeding : [Feeding]
    growing : [Growing]
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * creator : User
    * rearing : Rearing
}

entity Mutation {
    * _id : ID
    --
    * type : String
    * number : Number
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * rearingRecord : RearingRecord
    * creator : User
}

RearingRecord ||..o{ Mutation
User ||..o{ Mutation
Rearing ||..o{ RearingRecord
User ||..o{ Rearing
User ||..o{ RearingRecord

'type = for in or out
entity Feeding {
    * _id : ID
    --
    * number : Number
    * feed : Feed
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * rearingRecord : RearingRecord
    * creator : User

}
User ||..o{ Feeding
RearingRecord ||..o{ Feeding
Rearing ||..o{ Feeding

entity Feed {
    * _id : ID
    --
    * code : String
    company : String
    type : String
    year : String
    otherInformation : String
    * creator : User
    * feedStocks : [FeedStock]
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
}

entity FeedStock {
    * _id : ID
    --
    * number : Number
    * feed : Feed
    * feedWarehouse : FeedWarehouse
    * creator : User
}

User ||..o{ Feed
Feed ||..o{ Feeding
Feed ||..o{ FeedStock
User ||..o{ FeedWarehouse
User ||..o{ FeedStock
Company ||..o{ FeedWarehouse
FeedWarehouse ||..o{ House
FeedWarehouse ||..o{ FeedStock


entity Growing {
    * _id : ID
    --
    * growingParam : GrowingParam
    * value : Number
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * rearingRecord : RearingRecord
    * creator : User
}
User ||..o{ Growing
RearingRecord ||..o{ Growing
Rearing ||..o{ Growing

entity GrowingParam {
    * _id : ID
    --
    * name : String
    * abbr : String
    * unit : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    growing : [Growing]
    * creator : User
}

User ||..o{ GrowingParam
GrowingParam ||..o{ Growing

entity Harvest {
    * _id : ID
    --
    * date : Date
    * totalWeight : Number
    * numberLiveBird : Number
    * averageWeight : Number
    * createdAt : Date
    * updatedAt : Date
    deleted_at : Date
    * creator : User
    * rearing : Rearing
}

User ||..o{ Harvest
Rearing ||..o{ Harvest

entity DeviceType {
    * _id : ID
    --
    * name : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    creator : User
}

User ||..o{ DeviceType

entity Device {
    * _id : ID
    --
    * serialNumber : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    * house : House
    * deviceType : DeviceType
    * creator : User
    deviceRecord : [DeviceRecord]
}

DeviceType ||..o{ Device
User ||..o{ Device

entity DeviceRecord {
    * _id : ID
    * value : Number
    * device : Device
    * sensorType : SensorType
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
}

entity SensorType {
    * _id : ID
    * name : String
    * createdAt : Date
    * updatedAt : Date
    deletedAt : Date
    deviceRecord : [DeviceRecord]
    creator : User
}

SensorType ||..o{ DeviceRecord
House ||..o{ DeviceRecord
Device ||..o{ DeviceRecord

@enduml
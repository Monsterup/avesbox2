const House = require('../models/house');
const User = require('../models/user');
const Company = require('../models/company');
const faker = require('faker');

const house = (userId = '5e60896bc122370d80d9a785', callback, errorCallback) => {
    const type = [15000, 10000,5000,3500,11000,7300];
    Company.findOne({creator: userId},
        (err, company) => {
            if (err) return console.log(err);

            House.create({
                name: faker.company.companyName(),
                capacity: type[Math.floor(Math.random() * type.length)],
                lat : faker.address.latitude(),
                lng : faker.address.longitude(),
                address : faker.address.streetAddress(),
                otherInformation: faker.lorem.sentence(),
                company: company._id,
                creator: userId
            }, async (err, house) => {
                if (err) throw (err);
                try {
                    const creator = await User.findById(userId);
                    if (!creator)
                        throw new Error('user not found');
                    creator.createdHouse.push(house);
                    await creator.save();
                    callback(house);
                } catch (e) {
                    errorCallback(e);
                }
            });
        })
}

exports.house = house;
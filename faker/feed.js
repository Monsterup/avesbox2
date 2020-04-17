const Feed = require('../models/feed');
const User = require('../models/user');
const Company = require('../models/company');
const faker = require('faker');

const feed = (userId = '5e60896bc122370d80d9a785', callback, errorCallback) => {
    const type = ['starter', 'growing'];
    Company.findOne({creator: userId},
        (err, company) => {
        console.log(userId);
            if (err) return handleError(err);

            Feed.create({
                code: faker.random.number(10),
                producer: faker.company.companyName(),
                type: type[Math.floor(Math.random() * type.length)],
                year: '2020',
                otherInformation: faker.lorem.sentence(),
                company: company._id,
                creator: userId
            }, async (err, feed) => {
                if (err) throw (err);
                try {
                    const creator = await User.findById(userId);
                    if (!creator)
                        throw new Error('user not found');
                    creator.createdFeed.push(feed);
                    await creator.save();
                    callback(feed);
                } catch (e) {
                    throw e;
                }
            });
        })
}

exports.feed = feed;
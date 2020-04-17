const User = require('../models/user');
const Company = require('../models/company');
const faker = require('faker');

const company = (userId = '5e60896bc122370d80d9a785',callback,errorCallback) => {
    const type = ['perusahaan_kemitraaan', 'peternakan_mandiri'];
    Company.create({
        name: faker.company.companyName(),
        type: type[Math.floor(Math.random() * type.length)],
        creator: userId
    }, async (err, company) => {
        if (err) return handleError(err);
        try {
            const creator = await User.findById(userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdCompany.push(company);
            await creator.save();
            callback(company);
        } catch (e) {
            errorCallback(e);
        }
    });
}


exports.company = company;
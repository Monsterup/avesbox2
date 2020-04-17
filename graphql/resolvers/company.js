const Company = require('../../models/company');
const User = require('../../models/user');
const Manage = require('../../models/manage');
const {transformCompany, transformManage} = require('./merge');

module.exports = {
    // companies
    companies: async (args, req) => { 
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
                {type: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await Company.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const companies = await Company.find({creator})
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);
                
            return {
                totalCount,
                companies: companies.map(company => {
                    return transformCompany(company)
                })
            }
        } catch (error) {
            throw error;
        }
    },
    // company
    company: async (_id, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const company = await Company.findOne({_id});
            if (!company)
                throw new Error('Company not found');
            console.log(company);
            return transformCompany(company)
        } catch (error) {
            throw error;
        }
    },
    // create company (buat resolver company dulu)
    createCompany: async (args, req) => {
        if(!req.isAuth)
            throw new Error('Unauthenticated');
        let company = new Company({
            name: args.companyInput.name,
            type: args.companyInput.type,
            creator: req.userId
        });
        let createdCompany;
        try {
            const creator = await User.findById(req.userId);
            if(!creator)
                throw new Error('user not found');
            const res = await company.save();
            createdCompany = transformCompany(res);
            const manage = new Manage({
                company: res._id,
                user: req.userId,
                creator: req.userId
            });
            await manage.save();
            creator.createdCompany.push(company);
            creator.createdManage.push(manage);
            await creator.save();
            res.companyManage.push(manage);
            await res.save();
            return createdCompany;
        } catch (error) {
            throw error;
        }
    },
    // update company
    updateCompany: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedCompany;
        try {
            const company = await Company.findOneAndUpdate({_id : args._id},{
                name: args.updateCompanyInput.name,
                type: args.updateCompanyInput.type,
                creator: req.userId
            });
            updatedCompany = transformCompany(company);
            return updatedCompany;
        } catch (error) {
            throw error;
        }
    },
    // delete company
    deleteCompany: async (args, req) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await Company.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    },
};
const { Parcel } = require('../models');
const { Op } = require('sequelize');

const numberResolverHelper = require('../helpers/numberResolverHelper')

const resolvers = {
    Query: {
        parcels: (root, { from, limit, ownerName }) => {
            const options = {
                offset: from || 0,
                limit: limit || 20,
            };

            if (ownerName) {
                nameQuery = { [Op.like]: `%${ownerName.split(' ').join('%')}%` }
                options.where = { 
                    [Op.or]: {
                        ownerName1: nameQuery,
                        ownerName2: nameQuery,
                    }
                }
            }

            return Parcel.findAll(options);
        },
        parcel: (root, { id }) => Parcel.findById(id),
    },
    Parcel: {
        owners: (root) => {
            const { ownerName1, ownerName2 } = root.dataValues;
            return [ownerName1, ownerName2].filter(name => name.length > 0);
        },
        totalAcres: (root, args, context, info) => numberResolverHelper(root, info),
        assessedAcres: (root, args, context, info) => numberResolverHelper(root, info),
        landValue: (root, args, context, info) => numberResolverHelper(root, info),
        improvementValue: (root, args, context, info) => numberResolverHelper(root, info),
        currentAssessedValue: (root, args, context, info) => numberResolverHelper(root, info),
        previousAssessedValue: (root, args, context, info) => numberResolverHelper(root, info),
        objectID: (root, args, context, info) => numberResolverHelper(root, info),
    }
}


module.exports = { resolvers };

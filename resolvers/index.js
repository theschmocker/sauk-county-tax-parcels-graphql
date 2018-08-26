const { Parcel } = require('../models');

const { Op } = require('sequelize');

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
        totalAcres: (root, args, context, info) => numberHelper(root, info),
        assessedAcres: (root, args, context, info) => numberHelper(root, info),
        landValue: (root, args, context, info) => numberHelper(root, info),
        improvementValue: (root, args, context, info) => numberHelper(root, info),
        currentAssessedValue: (root, args, context, info) => numberHelper(root, info),
        previousAssessedValue: (root, args, context, info) => numberHelper(root, info),
        objectID: (root, args, context, info) => numberHelper(root, info),
    }
}

function numberHelper(root, info) {
    const { dataValues } = root;
    const { fieldName, returnType } = info;
    // returnType is not a string as I expected
    // it's a GraphQLOutputType object. toString must be called here
    switch (returnType.toString()) { 
        case 'Float':
            return parseFloat(dataValues[fieldName]) || 0.0;
            break;
        case 'Int':
            return parseInt(dataValues[fieldName]) || 0;
            break;
        default:
            return dataValues[fieldName];
    }
}

module.exports = { resolvers };

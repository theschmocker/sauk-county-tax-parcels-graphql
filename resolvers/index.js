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
        totalAcres: (root) => floatHelper(root, 'totalAcres'),
        assessedAcres: (root) => floatHelper(root, 'assessedAcres'),
    }
}

function floatHelper(root, fieldName) {
    const { dataValues } = root;
    return parseFloat(dataValues[fieldName]) || 0.0;
}

module.exports = { resolvers };

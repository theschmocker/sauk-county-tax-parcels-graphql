const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Parcel {
        id: ID!
        objectID: Int
        lowParcelID: String
        siteAddress: String
        owners: [String]
        postalAddress: String
        postalCity: String
        postalState: String
        postalZipCode: String
        totalAcres: Float
        properyDescription: String
        documents: String
        municipality: String
        schoolDistrict: String,
        schoolTaxCode: String,
        techSchoolDistrict: String,
        assessmentYear: String,
        landValue: Int
        improvementValue: Int
        currentAssessedValue: Int
        url: String
        previousAssessedValue: Int
        town: String,
        range: String,
        section: String,
        postalAddress2: String,
        assessedAcres: String, 
        previosAssesedAcres: String,
        previousTaxYear: String,
        city: String
        state: String,
        zipcode: String,
    }

    type Query {
        parcels(from: Int, limit: Int, ownerName: String): [Parcel]
        parcel(id: ID!): Parcel
    }
`;

module.exports = { typeDefs };

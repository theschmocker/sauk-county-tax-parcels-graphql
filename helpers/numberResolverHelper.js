module.exports = (root, info) => {
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

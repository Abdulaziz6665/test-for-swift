const restourant_module = require('./restourant/modules.js');

module.exports = {
    typeDefs: [
        ...restourant_module.typeDefs,
    ],
    resolvers: [
        ...restourant_module.resolvers,
    ]
}

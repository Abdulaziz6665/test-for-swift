const RestorantServices = require('./test/index.js')
// const RestOrderWaiting = require('./rest-order-waiting/index.js')
// const RestCheck = require('./rest-check/index.js')
// const FoodTypes = require('./restorant-food-types/index.js')
// const Foods = require('./foods/index.js')
// const Bookmarked = require('./bookmarked/index.js')
// const RatingViews = require('./rating-views/index.js')


module.exports = {
    typeDefs: [
        RestorantServices.typeDefs,
    //     RestOrderWaiting.typeDefs,
    //     RestCheck.typeDefs,
    //     FoodTypes.typeDefs,
    //     Foods.typeDefs,
    //     Bookmarked.typeDefs,
    //     RatingViews.typeDefs,
    ],
    resolvers: [
        RestorantServices.resolvers,
    //     RestOrderWaiting.resolvers,
    //     RestCheck.resolvers,
    //     FoodTypes.resolvers,
    //     Foods.resolvers,
    //     Bookmarked.resolvers,
    //     RatingViews.resolvers,
    ]
}
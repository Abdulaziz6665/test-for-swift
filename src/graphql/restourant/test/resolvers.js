const model = require('./model.js');
const {pubsub} = require('../../../lib/pubsub');

module.exports.resolvers = {
  Query: {
    foods: () => {
      try {
        return model.getFoods();
      } catch (error) {
        console.log(error);
        return error
      }
    }
  },
  Mutation: {
    addFood: async (_, {name, price} ) => {
      try {
        return await model.addFood(name, price);
      } catch (error) {
        console.log(error);
        return error
      }
    },
    deleteFoodByID: async (_, {id}) => {
      try {
        const deleted = await model.deleteFoodByID(id)
        return deleted
      } catch (error) {
        return error
      }
    }
  },
  Subscription: {
    
    foodAdded: {
      resolve: async (payload) => {
        const res = await model.foodByID(payload.id);
        return res
      },
      subscribe: () => pubsub.asyncIterator(['FOOD']),
    },
  }
};
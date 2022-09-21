const model = require('./model.js');
const {pubsub} = require('../../../lib/pubsub');
const { start } = require('../../../lib/notification');

module.exports.resolvers = {
  Query: {
    messages: () => {
      try {
        return model.messages();
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    signUp: async (_, {userName, password}) => {
      try {
        const addedUser = await model.signUp(userName, password);
        return addedUser;

      } catch (error) {
        console.log(error)
        return error
      }
    },
    login: async (_, {userName, password}) => {
      try {
        const addedUser = await model.login(userName, password);
        if (!addedUser) return new Error('User not found');
        return addedUser;

      } catch (error) {
        return error
      }
    },
    writeMessage: async (_, {message, userID}) => {
      try {
        const deviceTokens = await model.deviceIDs(userID);
        const addMessage = await model.createMessage(message, userID);
        pubsub.publish('NEW_MESSAGE', addMessage);
        start(deviceTokens.device_ids, message, deviceTokens.name);
        return 'addMessage'

      } catch (error) {
        return error
      }
    },
  },
  Subscription: {
    newMessage: {
      resolve: async payload => {
        return model.messageByID(payload.id)
      },
      subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE']),
    },
  }
};
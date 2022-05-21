const { PubSub, withFilter } = require('graphql-subscriptions');
require('events').EventEmitter.setMaxListeners(0)

const pubsub = new PubSub();

module.exports = {
    pubsub,
    withFilter
};
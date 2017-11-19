'use strict';

const rabbit = {
  uri: process.env.rabbbitUri || 'amqp://localhost',
  workQueue: process.env.workQueue || 'workQueue',
  xptoExchange: process.env.xptoExchange || 'xptoExchange',
  routingExchange: process.env.routingExchange || 'routingExchange',
  topicExchange: process.env.topicExchange || 'topicExchange'
};

module.exports = {
  rabbit: rabbit
};

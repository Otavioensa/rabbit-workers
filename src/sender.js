'use strict';

const amqp = require('amqplib');
const config = require('./config');
const promise = require('bluebird');

const uri = config.rabbit.uri;
const workQueue = config.rabbit.workQueue;
const assertQueueOptions = { durable: true };
const sendToQueueOptions = { persistent: true };
const data = process.argv[2] ? process.argv[2] : 'any data goes here';

const processLightStuff = () => promise.resolve(console.log('Process light stuff'));

const sendDataToQueue = () => {
  return amqp.connect(uri)
    .then((connection) => connection.createChannel())
    .then((channel) => assertAndSendToQueue(channel));
};

const assertAndSendToQueue = (channel) => {

  const bufferedData = new Buffer(data);

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.sendToQueue(workQueue, bufferedData, sendToQueueOptions))
    .then(() => channel.close());
};

const send = (() => processLightStuff()
 .then(() => sendDataToQueue())
 .then(() => process.exit(0)))()

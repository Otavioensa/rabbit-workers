'use strict';

const amqp = require('amqplib');
const promise = require('bluebird');
const config = require('./config');

const uri = config.rabbit.uri;
const workQueue = config.rabbit.workQueue;
const assertQueueOptions = { durable: true };
const consumeQueueOptions = { noAck: false };

const assertAndConsumeQueue = (channel) => {

  const ackMessage = (msg) =>  doYourHeavyTask(msg).then(() => channel.ack(msg));

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.prefetch(1))
    .then(() => channel.consume(workQueue, ackMessage, consumeQueueOptions));
};

// faz todo o trabalho pesado que a aplicação não podia lidar.
const doYourHeavyTask = (msg) =>  promise.resolve(setTimeout(() => console.log(msg.content.toString()), Math.random() * 10000));

const getMessages = (() => amqp.connect(uri)
  .then((connection) => connection.createChannel())
  .then((channel) => assertAndConsumeQueue(channel)))()

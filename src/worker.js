
import amqp from 'amqplib';
import promise from 'bluebird';
import { rabbitConfig } from './config';

const assertQueueOptions = { durable: true };
const consumeQueueOptions = { noAck: false };

const {
  uri,
  workQueue,
} = rabbitConfig;

// eslint-disable-next-line
const doYourHeavyTask = msg => promise.resolve(setTimeout(() => console.log(
  msg.content.toString()), Math.random() * 10000));

const assertAndConsumeQueue = (channel) => {
  const ackMessage = msg => doYourHeavyTask(msg).then(() => channel.ack(msg));

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.prefetch(1))
    .then(() => channel.consume(workQueue, ackMessage, consumeQueueOptions));
};

// eslint-disable-next-line
const getMessages = (() => amqp.connect(uri)
  .then(connection => connection.createChannel())
  .then(channel => assertAndConsumeQueue(channel)))();

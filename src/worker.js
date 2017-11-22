
import amqp from 'amqplib';
import promise from 'bluebird';
import config from './config';

const assertQueueOptions = { durable: true };
const consumeQueueOptions = { noAck: false };

const {
  uri,
  workQueue,
} = config;

const heavyTask = msg => setTimeout(() =>
  console.log(msg.content.toString()), Math.random() * 10000);

const assertAndConsumeQueue = (channel) => {
  const ackMsg = msg => promise.resolve(heavyTask(msg))
    .then(() => channel.ack(msg));

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.prefetch(1))
    .then(() => channel.consume(workQueue, ackMsg, consumeQueueOptions));
};

const getQueueMessages = (() => amqp.connect(uri)
  .then(connection => connection.createChannel())
  .then(channel => assertAndConsumeQueue(channel)));

export default getQueueMessages();

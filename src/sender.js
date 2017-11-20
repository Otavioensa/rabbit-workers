
import amqp from 'amqplib';
import promise from 'bluebird';
import config from './config';

const assertQueueOptions = { durable: true };
const sendToQueueOptions = { persistent: true };
const data = process.argv[2] ? process.argv[2] : 'any data goes here';

const {
  uri,
  workQueue,
} = config;

// eslint-disable-next-line
const lightTask = () => console.log('Light task');

const assertAndSendToQueue = (channel) => {
  const bufferedData = Buffer.from(data);

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.sendToQueue(workQueue, bufferedData, sendToQueueOptions))
    .then(() => channel.close());
};

const sendDataToQueue = () => amqp.connect(uri)
  .then(connection => connection.createChannel())
  .then(channel => assertAndSendToQueue(channel));

// eslint-disable-next-line
const send = (() => promise.resolve(lightTask())
  .then(() => sendDataToQueue())
  .then(() => process.exit(0)))();

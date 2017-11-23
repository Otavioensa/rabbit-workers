
import amqp from 'amqplib'
import {
  resolve,
  tap,
} from 'bluebird'
import config from './config'

const assertQueueOptions = { durable: true }
const consumeQueueOptions = { noAck: false }

const {
  uri,
  workQueue,
} = config

const genRamdomTime = () => Math.random() * 10000

const processHeavyTask = msg => resolve(console.log('Message received'))
  .then(setTimeout(() => console.log(msg.content.toString()), genRamdomTime()))

const assertAndConsumeQueue = (channel) => {

  const ackMsg = (msg) => resolve(msg)
    .tap(msg => processHeavyTask(msg))
    .then((msg) => channel.ack(msg))

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.prefetch(1))
    .then(() => channel.consume(workQueue, ackMsg, consumeQueueOptions))
};

const listenToQueue = () => amqp.connect(uri)
  .then(connection => connection.createChannel())
  .then(channel => assertAndConsumeQueue(channel))


export default listenToQueue()

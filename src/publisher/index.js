
import amqp from 'amqplib'
import { resolve } from 'bluebird'
import config from '../config'

const assertQueueOptions = { durable: true }
const sendToQueueOptions = { persistent: true }
const data = process.argv[2] ? process.argv[2] : 'any data goes here'
const { uri, workQueue } = config

const lightTask = () => resolve(console.log('Light task abstraction'))

const assertAndSendToQueue = (channel) => {
  const bufferedData = Buffer.from(data)

  return channel.assertQueue(workQueue, assertQueueOptions)
    .then(() => channel.sendToQueue(workQueue, bufferedData, sendToQueueOptions))
    .then(() => channel.close())
}

const sendHardTaskToQueue = () => amqp.connect(uri)
  .then(connection => connection.createChannel())
  .then(channel => assertAndSendToQueue(channel))

const start = () => lightTask()
  .then(() => sendHardTaskToQueue())
  .tap(() => console.log('The message has been sent to queue'))
  .then(() => process.exit(0))

export default start()

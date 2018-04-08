# Rabbit Workers
Repository created for supporting my talk about 'Rabbit Workers'.
If you speak portuguese you can check a video explanation about how to work
with the concept of workers applications in RabbitMQ, by clicking [here](https://www.youtube.com/watch?v=p4cevymrEq0&t=98s)

## Requisites
You should already have node, npm and rabbit installed on your machine!

## Steps for execution

```
1) Clone the repository
2) Go to the application root directory and execute npm install
3) "npm run worker" for start running the worker application
4) "npm run publisher yourMessageAsParameter" for sending your message to the queue
```

## Publisher/Worker Demonstration

1) Publisher application sends a message
2) Worker application starts and receive the published message

[![asciicast](https://asciinema.org/a/zkjxZQSNEupL3h4Reqs6dDej2.png)](https://asciinema.org/a/zkjxZQSNEupL3h4Reqs6dDej2?speed=2&autoplay=1)

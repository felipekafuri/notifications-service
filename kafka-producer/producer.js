import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['sunny-magpie-10436-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'c3VubnktbWFncGllLTEwNDM2JNIqyvtUWr6Rdlak7VWu0GR-SsUOiO-5rwb9e9Y',
      password: '8d69cab9b175446794172b77ddb16685',
    },
    ssl: true,
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade!',
          category: 'social',
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}
bootstrap();

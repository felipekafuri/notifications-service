import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';
import { KafkaConsumerService } from './infra/database/kafka/kafka-consumer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      topic: 'notifications.send-notification',
      subscription: 'cats_subscription',
      client: {
        projectId: 'projeto-sis-ubiquos-fk-370122',
        keyFilename: './credentials.json',
      },
    }),
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

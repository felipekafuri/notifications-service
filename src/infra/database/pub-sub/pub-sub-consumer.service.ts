import { OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';

export class GCPubSubService implements OnApplicationShutdown {
  client: ClientProxy;

  constructor() {
    this.client = new GCPubSubClient({
      client: {
        apiEndpoint: 'localhost:3000',
        projectId: 'projeto-sis-ubiquos-fk-370122',
        keyFilename: './credentials.json',
      },
    });
  }

  onApplicationShutdown() {
    return this.client.close();
  }
}

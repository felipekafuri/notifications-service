import { SendNotification } from '@/application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern()
  getNotifications(@Payload() data: number[], @Ctx() context: GCPubSubContext) {
    const originalMsg = context.getMessage();
    // convert Buffer to json
    const payload = JSON.parse(
      originalMsg.data.toString(),
    ) as SendNotificationPayload;

    console.log('payload', payload);
    originalMsg.ack();
  }
}

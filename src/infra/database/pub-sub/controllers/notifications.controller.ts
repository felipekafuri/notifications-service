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

  @EventPattern('notifications.send-notification')
  getNotifications(@Payload() data: number[], @Ctx() context: GCPubSubContext) {
    const originalMsg = context.getMessage();
    console.log(originalMsg);
    // originalMsg.ack();
  }
}

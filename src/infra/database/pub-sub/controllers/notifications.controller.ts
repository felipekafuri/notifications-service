import { SendNotification } from '@/application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload } from '@nestjs/microservices';
import { GCPubSubContext } from 'nestjs-google-pubsub-microservice';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @MessagePattern('notifications')
  async handleSendNotification(
    @Payload() { content, category, recipientId }: SendNotificationPayload,
    @Ctx() context: GCPubSubContext,
  ) {
    console.log(`Message: ${context.getMessage()}`);
    // await this.sendNotification.execute({ content, category, recipientId });
  }
}

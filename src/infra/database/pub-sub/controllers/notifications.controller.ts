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
  async handleSendNotification(
    @Payload() data: number[],
    @Ctx() context: GCPubSubContext,
  ) {
    const originalMsg = context.getMessage();
    const { content, category, recipientId } = JSON.parse(
      originalMsg.data.toString(),
    ) as SendNotificationPayload;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });
    originalMsg.ack();

    return {
      notification,
    };
  }
}

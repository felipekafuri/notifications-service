import { SendNotification } from '@/application/use-cases/send-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { NotificationsController } from '@/infra/database/pub-sub/controllers/notifications.controller';
import { GCPubSubService } from '@/infra/database/pub-sub/pub-sub-consumer.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [SendNotification, GCPubSubService],
  controllers: [NotificationsController],
})
export class MessagingModule {}

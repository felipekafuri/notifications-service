import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@/application/use-cases/cancel-notitication';
import { CountRecipientNotification } from '@/application/use-cases/count-recipient-notifications';
import { GetRecipientsNotifications } from '@/application/use-cases/get-recipients-notifications';
import { ReadNotification } from '@/application/use-cases/read-notification';
import { UnreadNotification } from '@/application/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientsNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}

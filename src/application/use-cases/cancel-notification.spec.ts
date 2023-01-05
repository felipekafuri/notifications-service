import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notitication';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    const canceledNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(canceledNotification.canceledAt).not.toBeNull();
  });

  it('should not be able to cancel notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});

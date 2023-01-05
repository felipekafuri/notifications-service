import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const notification = makeNotification({ readAt: new Date() });
    await notificationsRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    const unreadedNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(unreadedNotification.readAt).toBeNull();
  });

  it('should not be able to read notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new UnreadNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});

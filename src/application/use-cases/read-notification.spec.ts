import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });

    const readedNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(readedNotification.readAt).not.toBeNull();
  });

  it('should not be able to read notification when it does not exists', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new ReadNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFound);
  });
});

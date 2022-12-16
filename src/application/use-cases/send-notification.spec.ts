import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);
    const { notification } = await sendNotification.execute({
      recipientId: '123456',
      content: 'Hello World',
      category: 'new_message',
    });
    expect(notificationsRepository.notifications.length).toBe(1);
    expect(notification.recipientId).toBe('123456');
  });
});

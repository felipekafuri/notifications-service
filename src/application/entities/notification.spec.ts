import { Notification } from './notification';
import { Content } from './content';

describe('Notification ', () => {
  it('should be able to create a notification ', () => {
    const notification = new Notification({
      recipientId: '123456',
      content: new Content('Hello World'),
      category: 'new_message',
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});

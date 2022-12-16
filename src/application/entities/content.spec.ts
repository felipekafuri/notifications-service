import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Hello World');
    expect(content.value).toBe('Hello World');
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('')).toThrowError(
      'Content length must be between 5 and 255 characters',
    );
  });

  it('should not be able to create a notification content with more than 255 characters', () => {
    expect(() => new Content('a'.repeat(256))).toThrowError(
      'Content length must be between 5 and 255 characters',
    );
  });
});

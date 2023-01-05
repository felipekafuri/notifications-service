import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(notificationId: string) {
    const raw = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!raw) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(raw);
  }

  async save(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }

  async countManyByRecipientId(recipientId: string) {
    return this.prismaService.notification.count({
      where: { recipientId },
    });
  }

  async findManyByRecipientId(recipientId: string) {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });
    return notifications.map((r) => PrismaNotificationMapper.toDomain(r));
  }
}

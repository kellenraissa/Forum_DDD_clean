import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Notification,
  NotificationProps,
} from "@/domain/notification/enterprise/entities/notification";

import { faker } from "@faker-js/faker";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence({ min: 1, max: 4 }),
      content: faker.lorem.sentence({ min: 1, max: 10 }),
      ...override,
    },
    id,
  );

  return notification;
}

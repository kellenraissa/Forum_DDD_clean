import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handle";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }
  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this), //o this sempre vai ser essa classe no bind
      AnswerCreatedEvent.name,
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer);
  }
}

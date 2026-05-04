import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handle";
import { SendNotificationUseCase } from "../use-cases/send-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen-event";

export class OnquestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }
  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestNotification.bind(this), //o this sempre vai ser essa classe no bind
      QuestionBestAnswerChosenEvent.name,
    );
  }

  private async sendQuestionBestNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString(),
    );
    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer?.authorId.toString(),
        title: "Sua resposta foi escolhida!",
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat("...")}" foi escolhida pelo autor!`,
      });
    }
  }
}

import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async create(answer: Answer) {
    this.items.push(answer);
  }
}

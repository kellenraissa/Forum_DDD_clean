import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { faker } from "@faker-js/faker";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence({ min: 1, max: 10 }),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}

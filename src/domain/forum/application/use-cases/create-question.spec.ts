import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { QuestionsRepository } from "../repositories/question-repository";
import { Question } from "../../enterprise/entities/question";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (question: Question) => {},
};

test("create a question", async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await createQuestion.execute({
    authorId: "1",
    title: "Qual o seu nome",
    content: "Digite seu nome completo",
  });

  expect(question.id).toBeTruthy();
});

import { beforeEach, describe, expect, it } from "vitest";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });
  // sut = system under test
  it("should be able to create a question", async () => {
    const { question } = await sut.execute({
      authorId: "1",
      title: "Qual o seu nome",
      content: "Digite seu nome completo",
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
  });
});

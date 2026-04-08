import { beforeEach, describe, expect, it } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository);
  });
  // sut = system under test
  it("should be able to create a answer", async () => {
    const result = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Nova resposta",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
  });
});

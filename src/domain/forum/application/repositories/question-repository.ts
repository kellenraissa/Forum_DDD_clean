import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>;
  create(answer: Question): Promise<void>;
}

import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachment } from "../../enterprise/entities/question-attachments";

export interface QuestionAttachmentRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}

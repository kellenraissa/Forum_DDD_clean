import { AnswerAttachment } from "../../enterprise/entities/answer-attachments";

export interface AnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>;
  deleteManyByAnswerId(answerId: string): Promise<void>;
}

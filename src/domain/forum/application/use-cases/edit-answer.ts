import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachments";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentRepository } from "../repositories/answer-attachments-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachments-list";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}
type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (authorId != answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);
    const answerAttachemntList = new AnswerAttachmentList(
      currentAnswerAttachments,
    );

    const answerAttahcments = attachmentsIds.map((attachmentsId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentsId),
        answerId: answer.id,
      });
    });

    answerAttachemntList.update(answerAttahcments);

    answer.attachments = answerAttachemntList;

    answer.content = content;

    await this.answersRepository.save(answer);

    return right({
      answer,
    });
  }
}

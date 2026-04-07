import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = {};

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("sdsd");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("sdsd");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}

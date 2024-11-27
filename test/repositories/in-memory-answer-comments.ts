import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return (
      this.answerComments.find((comment) => comment.id.toString() === id) ||
      null
    )
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.answerComments = this.answerComments.filter(
      (comment) => comment.id !== answerComment.id,
    )
  }
}

import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('delete answercomment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should not be able to delete a answer comment from another author', async () => {
    const answercomment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answercomment)

    await expect(
      sut.execute({
        answercommentId: answercomment.id.toString(),
        authorId: 'another-author-id',
      }),
    ).rejects.toThrow('Not allowed')
  })

  it('should be able to delete a answer comment', async () => {
    const answercomment = makeAnswerComment()
    await inMemoryAnswerCommentsRepository.create(answercomment)

    await sut.execute({
      answercommentId: answercomment.id.toString(),
      authorId: answercomment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.answerComments).toHaveLength(0)
  })
})

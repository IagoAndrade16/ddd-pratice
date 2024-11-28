import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should not be able to delete a answer from another author', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-author-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
  })
})

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should not be able to edit a answer from another author', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-author-id',
      content: 'content',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer()
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'new content',
    })

    expect(inMemoryAnswersRepository.answers).toHaveLength(1)
    expect(inMemoryAnswersRepository.answers[0].content).toBe('new content')
  })
})

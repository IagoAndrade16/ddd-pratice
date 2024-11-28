import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should not be able to delete a question from another author', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: 'another-author-id',
    })

    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(result.isLeft()).toBeTruthy()
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })
})

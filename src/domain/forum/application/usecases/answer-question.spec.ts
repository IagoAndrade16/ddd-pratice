import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('create answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create a answer', async () => {
    const answer = await sut.execute({
      authorId: 'authorId',
      content: 'content',
      questionId: 'questionId',
    })

    expect(answer.content).toBe('content')
    expect(inMemoryAnswersRepository.answers).toHaveLength(1)
  })
})

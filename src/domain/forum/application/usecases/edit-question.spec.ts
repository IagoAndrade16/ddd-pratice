import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should not be able to edit a question from another author', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await expect(
      sut.execute({
        questionId: question.id.toString(),
        authorId: 'another-author-id',
        content: 'content',
        title: 'title',
      }),
    ).rejects.toThrow('Not allowed')
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion()
    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'new content',
      title: 'title',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(1)
    expect(inMemoryQuestionsRepository.questions[0].content).toBe('new content')
  })
})

import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-01'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-02'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2021-01-03'),
      }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions.length).toBe(3)
    expect(questions[0].createdAt).toEqual(new Date('2021-01-03'))
    expect(questions[1].createdAt).toEqual(new Date('2021-01-02'))
    expect(questions[2].createdAt).toEqual(new Date('2021-01-01'))
  })

  it('should be able to fetch paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion({}))
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions.length).toBe(2)
  })
})

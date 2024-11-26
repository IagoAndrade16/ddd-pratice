import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('fetch recent answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('1'),
        createdAt: new Date('2021-01-01'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('1'),
        createdAt: new Date('2021-01-02'),
      }),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date('2021-01-03'),
        questionId: new UniqueEntityID('1'),
      }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: new UniqueEntityID('1'),
    })

    expect(answers.length).toBe(3)
  })

  it('should be able to fetch paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('1'),
        }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: new UniqueEntityID('1'),
    })

    expect(answers.length).toBe(2)
  })
})

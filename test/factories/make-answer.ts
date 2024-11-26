import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID,
): Answer {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID('authorId'),
      content: faker.lorem.text(),
      questionId: new UniqueEntityID('questionId'),
      ...override,
    },
    id,
  )

  return answer
}
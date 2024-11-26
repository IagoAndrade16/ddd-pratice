import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(override?: Partial<QuestionProps>): Question {
  const question = Question.create({
    authorId: new UniqueEntityID('authorId'),
    content: 'content',
    title: 'title question',
    slug: Slug.create('example-question'),
    ...override,
  })

  return question
}

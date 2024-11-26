import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.slug.value === slug) || null
    )
  }

  async findById(id: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.id.toValue() === id) || null
    )
  }

  async delete(question: Question): Promise<void> {
    this.questions = this.questions.filter(
      (q) => q.id.toValue() !== question.id.toValue(),
    )
  }
}

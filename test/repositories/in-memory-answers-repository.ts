import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async findById(id: string): Promise<Answer | null> {
    return this.answers.find((answer) => answer.id.toValue() === id) || null
  }

  async delete(answer: Answer): Promise<void> {
    this.answers = this.answers.filter(
      (a) => a.id.toValue() !== answer.id.toValue(),
    )
  }

  async save(answer: Answer): Promise<void> {
    this.answers = this.answers.map((a) =>
      a.id.toValue() === answer.id.toValue() ? answer : a,
    )
  }
}

import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toValue() !== authorId) {
      throw new Error('Not allowed')
    }

    question.content = content
    question.title = title

    await this.questionsRepository.save(question)

    return {}
  }
}

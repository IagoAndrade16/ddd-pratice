import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('create notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })
  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)
    const result = await sut.execute({
      recipientId: 'authorId',
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryNotificationsRepository.items.length).toBe(1)
    expect(inMemoryNotificationsRepository.items[0].readAt).not.toBeNull()
  })
})

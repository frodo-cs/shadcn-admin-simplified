import { ENDPOINTS } from '@/constants'
import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

faker.seed(67890)

export const handlers = [
  // AUTH
  http.post(`/${ENDPOINTS.AUTH.LOGIN}`, async ({ request }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await request.json()) as any

    await sleep(1000)

    if (body.identifier === 'admin' && body.password === 'password') {
      return HttpResponse.json(
        {
          accessToken: 'mock-token-12345',
          user: {
            username: 'Admin',
            email: 'admin@mail.com',
            role: ['admin'],
          },
        },
        { status: 200 }
      )
    }

    return HttpResponse.json('Invalid credentials', { status: 401 })
  }),

  // ITEMS
  http.get(`/${ENDPOINTS.ITEMS.GET}`, async () => {
    await sleep(1000)
    const items = Array.from({ length: 500 }, () => {
      return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number(faker.commerce.price()),
        status: faker.helpers.arrayElement([
          'available',
          'unavailable',
          'discontinued',
        ]),
        type: faker.helpers.arrayElement(['service', 'product', 'combo']),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      }
    })

    return HttpResponse.json(items)
  }),

  http.post(`/${ENDPOINTS.ITEMS.GET}`, async ({ request }) => {
    const body = (await request.json()) as any
    await sleep(1000)
    const newItem = {
      ...body,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    return HttpResponse.json(newItem, { status: 201 })
  }),

  http.put(`/${ENDPOINTS.ITEMS.GET}/:id`, async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as any
    await sleep(1000)
    const updatedItem = {
      ...body,
      id: id as string,
      updatedAt: new Date().toISOString(),
    }
    return HttpResponse.json(updatedItem)
  }),

  http.delete(`/${ENDPOINTS.ITEMS.GET}/:id`, async () => {
    await sleep(1000)
    return new HttpResponse(null, { status: 204 })
  }),

  // SETTINGS
  http.get(`/${ENDPOINTS.SETTINGS.GET}`, async () => {
    await sleep(1000)
    const user = {
      id: faker.string.uuid(),
      username: faker.commerce.productName(),
      email: faker.internet.email(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }

    return HttpResponse.json(user)
  }),
]

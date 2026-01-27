import { sleep } from '@/lib/utils'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('*/auth/login', async ({ request }) => {
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
]

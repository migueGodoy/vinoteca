import { Hono } from 'hono'
import wines from '../db/wines.json'

const app = new Hono()

app.get('/', ctx => {
  return ctx.json({
    endpoints: [
      {
        url: '/wines',
        description: 'get all wines'
      }
    ]
  })
})

app.get('/wines', ctx => ctx.json(wines))

export default app

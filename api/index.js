import { Hono } from 'hono'
import wines from '../db/wines.json'
import grapes from '../src/grapes'

const app = new Hono()

app.get('/', ctx => {
  return ctx.json({
    endpoints: [
      {
        url: '/wines',
        description: 'get all wines'
      },
      {
        url: '/grapes',
        description: 'get all grapes'
      },
      {
        url: '/invent',
        description: 'me lo invent'
      }
    ]
  })
})

app.get('/wines', ctx => ctx.json(wines))

app.get('/grapes', ctx => ctx.json(grapes()))

export default app

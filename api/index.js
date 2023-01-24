import { Hono } from 'hono'
import wines from '../db/wines.json'

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
      }
    ]
  })
})

app.get('/wines', ctx => ctx.json(wines))

app.get('/grapes', ctx => {
  const allGrapes = []
  wines.forEach(wine => {
    const { grapes } = wine
    if (grapes?.length) allGrapes.push(...grapes)
  })

  const grapesWithoutDuplicatesAndSorted = Array.from(new Set(allGrapes.map(grape => grape.id)))
    .map(id => allGrapes.find(a => a.id === id)).sort((a, b) => a.id - b.id)

  return ctx.json(grapesWithoutDuplicatesAndSorted)
})

export default app

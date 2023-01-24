import wines from '../db/wines.json'

const grapes = () => {
  const allGrapes = []
  wines.forEach(wine => {
    const { grapes } = wine
    if (grapes?.length) allGrapes.push(...grapes)
  })

  const grapesWithoutDuplicates = Array.from(new Set(allGrapes.map(grape => grape.id)))
    .map(id => allGrapes.find(a => a.id === id))

  grapesWithoutDuplicates.sort((a, b) => a.id - b.id)
  return grapesWithoutDuplicates
}

export default grapes

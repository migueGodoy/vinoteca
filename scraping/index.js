import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const wines = []

for (let i = 0; i < 94; i++) {
  console.log('Starting i: ' + i)
  for (let j = 0; j < 10; j++) {
    console.log({ j })
    const url = `https://www.vivino.com/api/explore/explore?order_by=discount_percent&order=desc&price_range_max=3000000&price_range_min=0&wine_type_ids%5B%5D=1&wine_type_ids%5B%5D=2&wine_type_ids%5B%5D=3&wine_type_ids%5B%5D=24&wine_type_ids%5B%5D=7&wine_type_ids%5B%5D=4&page=${i}${j}&language=es&per_page=50`
    const winesPerPage = await fetch(url)
      .then(response => response.json())
      .then(data => data.explore_vintage.matches)

    const winesWithOnlyInterestingProperties = winesPerPage.map(wine => (
      {
        id: wine?.vintage?.wine?.id,
        name: wine?.vintage?.wine?.name,
        winery: wine?.vintage?.wine?.winery?.name,
        year: wine?.vintage?.year,
        region: wine?.vintage?.wine?.region?.name,
        country: wine?.vintage?.wine?.region?.country?.name,
        rating: wine?.vintage?.statistics?.ratings_average,
        ratingCount: wine?.vintage?.statistics?.ratings_count,
        price: wine?.price?.amount,
        originalPrice: wine?.price?.discounted_from,
        currency: wine?.price?.currency?.code,
        volume: wine?.price?.bottle_type?.volume_ml,
        grapes: wine?.vintage?.wine?.region?.country?.most_used_grapes?.map(grape => (
          {
            id: grape?.id,
            name: grape?.name
          }
        )),
        taste: {
          acidity: wine?.vintage?.wine?.taste?.structure?.acidity,
          fizziness: wine?.vintage?.wine?.taste?.structure?.fizziness,
          intensity: wine?.vintage?.wine?.taste?.structure?.intensity,
          sweetness: wine?.vintage?.wine?.taste?.structure?.sweetness,
          tannin: wine?.vintage?.wine?.taste?.structure?.tannin,
          userStructureCount: wine?.vintage?.wine?.taste?.structure?.calculated_structure_count
        }
      }
    ))

    wines.push(...winesWithOnlyInterestingProperties)
  }
}

const filePath = path.join(process.cwd(), 'db', 'wines.json')
await writeFile(filePath, JSON.stringify(wines, null, 2), 'utf-8')

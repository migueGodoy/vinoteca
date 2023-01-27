import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const getWines = async (pages) => {
  const wines = []
  for (let i = 0; i < pages; i++) {
    console.log('Starting i: ' + i)
    for (let j = 0; j <= 9; j++) {
      console.log({ j })
      const url = `https://www.vivino.com/api/explore/explore?country_code=ES&currency_code=EUR&min_rating=1&order_by=discount_percent&order=desc&price_range_max=50000&price_range_min=0&wine_type_ids%5B%5D=1&wine_type_ids%5B%5D=2&wine_type_ids%5B%5D=7&page=${i}${j}&language=es&per_page=50`
      const winesPerPage = await fetch(url)
        .then(response => response.json())
        .then(data => data.explore_vintage.matches)

      const winesWithOnlyInterestingProperties = winesPerPage.map(wine => {
        return {
          vintageId: wine?.vintage?.id,
          wineId: wine?.vintage?.wine?.id,
          vintageName: wine?.vintage?.name,
          wineName: wine?.vintage?.wine?.name,
          typeId: wine?.vintage?.wine?.type_id,
          winery: wine?.vintage?.wine?.winery?.name,
          year: wine?.vintage?.year,
          region: wine?.vintage?.wine?.region?.name,
          country: wine?.vintage?.wine?.region?.country?.name,
          rating: wine?.vintage?.statistics?.ratings_average,
          ratingCount: wine?.vintage?.statistics?.ratings_count,
          wineRating: wine?.vintage?.statistics?.wine_ratings_average,
          wineRatingCount: wine?.vintage?.statistics?.wine_ratings_count,
          price: wine?.price?.amount,
          originalPrice: wine?.price?.discounted_from,
          currency: wine?.price?.currency?.code,
          volume: wine?.price?.bottle_type?.volume_ml,
          grapes: wine?.vintage?.wine?.style?.grapes?.map(grape => (
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
          },
          pageFrom: `${i}${j}`
        }
      })

      wines.push(...winesWithOnlyInterestingProperties)
    }
  }

  return wines
}

// const winesWithoutDuplicates = Array.from(new Set(wines.map(wine => wine.id)))
//   .map(id => wines.find(a => a.id === id))

// const filePath = path.join(process.cwd(), 'db', 'wines.json')
// await writeFile(filePath, JSON.stringify(wines, null, 2), 'utf-8')

const writeWinesToFile = async (wines) => {
  const filePath = path.join(process.cwd(), 'db', 'wines.json')
  await writeFile(filePath, JSON.stringify(wines, null, 2), 'utf-8')
}

const wines = await getWines(69) // 69
writeWinesToFile(wines)

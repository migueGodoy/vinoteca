const PRICE_INCREMENT = 20

const getWines = async (endingPage, countryCode, currency, wineType, grape, price) => {
  const wines = []
  for (let i = 1; i <= endingPage; i++) {
    try {
      const url = `https://www.vivino.com/api/explore/explore?country_code=${countryCode}&currency_code=${currency}&min_rating=1&order_by=price&order=desc&price_range_max=${price + PRICE_INCREMENT}&price_range_min=${price}&wine_type_ids%5B%5D=${wineType}&grape_ids%5B%5D=${grape}&page=${i}&per_page=50&language=es`
      const winesPerPage = await fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log({
            page: i,
            endingPage,
            countryCode,
            currency,
            wineType,
            grape,
            price,
            records: data.explore_vintage.records_matched
          })
          return data.explore_vintage.records
        })

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
          acidity: wine?.vintage?.wine?.taste?.structure?.acidity,
          fizziness: wine?.vintage?.wine?.taste?.structure?.fizziness,
          intensity: wine?.vintage?.wine?.taste?.structure?.intensity,
          sweetness: wine?.vintage?.wine?.taste?.structure?.sweetness,
          tannin: wine?.vintage?.wine?.taste?.structure?.tannin,
          userStructureCount: wine?.vintage?.wine?.taste?.structure?.calculated_structure_count,
          pageFrom: i
        }
      })

      wines.push(...winesWithOnlyInterestingProperties)
    } catch (e) {
      console.log(e)
    }
  }

  return wines
}

(function(console) {
  console.save = function(data, filename) {
    if (!data) {
      console.error('Console.save: No data')
      return
    }
    if (!filename) filename = 'wines.json'
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4)
    }
    const blob = new Blob([data], { type: 'text/json' })
    const e = document.createEvent('MouseEvents')
    const a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console)

const getWinesPerCountryAndCurrency = async (countryCode, currency) => {
  console.log({ countryCode, currency })
  const allFuckingUniqueWines = []
  const allFuckingWines = []
  const winesCountFilter = winesCount.filter(wine => wine.numberOfPages !== 0)
  const winesCountMini = winesCountFilter// .slice(0, 2)
  for (const wine of winesCountMini) {
    console.log(wine)
    const moreWines = await getWines(wine.numberOfPages, countryCode, currency, wine.wineType, wine.grape, wine.price)
    allFuckingWines.push(...moreWines)
    console.log(allFuckingWines.length)
  }

  return allFuckingWines
}

const USWines = await getWinesPerCountryAndCurrency('US', 'USD')
const allFuckingUSWinesIds = USWines.map(wine => wine.vintageId + '-' + wine.wineId)
const allFuckingUSWinesIdsWithoutDuplicates = Array.from(new Set(allFuckingUSWinesIds))
const allFuckingUSUniqueWines = allFuckingUSWinesIdsWithoutDuplicates.map(id => USWines.find(wine => wine.vintageId == id.split('-')[0] && wine.wineId == id.split('-')[1]))
console.log(allFuckingUSUniqueWines.length)
console.save(allFuckingUSUniqueWines)
const spainWines = await getWinesPerCountryAndCurrency('ES', 'EUR')
const allFuckingSpainWinesIds = spainWines.map(wine => wine.vintageId + '-' + wine.wineId)
const allFuckingSpainWinesIdsWithoutDuplicates = Array.from(new Set(allFuckingSpainWinesIds))
const allFuckingSpainUniqueWines = allFuckingSpainWinesIdsWithoutDuplicates.map(id => spainWines.find(wine => wine.vintageId == id.split('-')[0] && wine.wineId == id.split('-')[1]))
console.log(allFuckingSpainUniqueWines.length)
console.save(spainWines)

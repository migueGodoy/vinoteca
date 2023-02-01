const grapes = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 29, 31, 32, 34, 36, 37, 39, 41, 42, 43, 45, 48, 49, 50, 51, 55, 56, 58, 62, 64, 67, 69, 74, 76, 77, 81, 89, 92, 93, 96, 97, 100, 103, 105, 108, 118, 127, 128, 129, 132, 135, 136, 142, 149, 155, 184, 221, 226, 233, 239, 260, 325, 328, 385, 390, 394, 514, 546, 548, 614, 677, 678, 732, 752]
const wineTypes = [1, 2, 7]
const PRICE_INCREMENT = 20

const getWines = async (countryCode, currency, wineType, grape, price) => {
  const url = `https://www.vivino.com/api/explore/explore?country_code=${countryCode}&currency_code=${currency}&min_rating=1&order_by=price&order=desc&price_range_max=${price + PRICE_INCREMENT}&price_range_min=${price}&wine_type_ids%5B%5D=${wineType}&grape_ids%5B%5D=${grape}&page=1&per_page=50&language=es`
  const results = await fetch(url)
    .then(response => response.json())
    .then(data => ({
      wineType,
      grape,
      results: data.explore_vintage.records_matched
    }))

  return results
}

const winesPerGrapeAndWineType = []

for (const wineType of wineTypes) {
  for (const grape of grapes) {
    for (let price = 0; price <= 500; price += PRICE_INCREMENT) {
      const wines = await getWines('ES', 'EUR', wineType, grape, price)
      const numberOfPages = Math.ceil(wines.results / 50)
      console.log({ wineType, grape, price, results: wines.results, numberOfPages })
      winesPerGrapeAndWineType.push(wines)
    }
  }
}

console.log(winesPerGrapeAndWineType.map(wine => wine.results).reduce((a, b) => a + b, 0))

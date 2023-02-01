const grapes = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 29, 31, 32, 34, 36, 37, 39, 41, 42, 43, 45, 48, 49, 50, 51, 54, 55, 56, 58, 62, 64, 67, 69, 74, 75, 76, 77, 80, 81, 85, 86, 89, 92, 93, 94, 96, 97, 100, 103, 104, 105, 108, 110, 114, 118, 119, 127, 128, 129, 132, 135, 136, 142, 149, 155, 174, 175, 184, 211, 221, 224, 226, 233, 239, 255, 257, 260, 300, 301, 325, 328, 347, 362, 385, 390, 394, 404, 514, 546, 548, 583, 590, 604, 614, 642, 677, 678, 732, 752, 884, 1037, 1177, 1231, 1232, 1374, 1437, 1556, 1641, 1708, 1738]
const wineTypes = [1, 2, 7]
const countryAndCurrencies = [{ country: 'ES', currency: 'EUR' }, { country: 'US', currency: 'USD' }]
const PRICE_INCREMENT = 20

const getWines = async (countryCode, currency, wineType, grape, price) => {
  const url = `https://www.vivino.com/api/explore/explore?country_code=${countryCode}&currency_code=${currency}&min_rating=1&order_by=price&order=desc&price_range_max=${price + PRICE_INCREMENT}&price_range_min=${price}&wine_type_ids%5B%5D=${wineType}&grape_ids%5B%5D=${grape}&page=1&per_page=50&language=es`
  try {
    const results = await fetch(url)
      .then(response => response.json())
      .then(data => ({
        wineType,
        grape,
        countryCode,
        currency,
        numberOfPages: Math.ceil(data.explore_vintage.records_matched / 50)
      }))

    return results
  } catch (e) {
    console.log(e)
    return []
  }
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

const winesPerGrapeAndWineType = []

for (const countryAndCurrency of countryAndCurrencies) {
  for (const wineType of wineTypes) {
    for (const grape of grapes) {
      for (let price = 0; price <= 500; price += PRICE_INCREMENT) {
        const wines = await getWines(countryAndCurrency.country, countryAndCurrency.currency, wineType, grape, price)
        console.log({ wineType, grape, price, ...countryAndCurrency })
        if (wines.numberOfPages > 0) winesPerGrapeAndWineType.push(wines)
      }
    }
  }
}

console.save(winesPerGrapeAndWineType)

export const fetchData = async (type: string) => {
  const site = type === 'meals' ? 'themealdb' : 'thecocktaildb'
  const url = `https://www.${site}.com/api/json/v1/1/search.php?s=`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error fetching data')
  }
}

export const fetchByCategory = async (type: string, category: string) => {
  const site = type === 'meals' ? 'themealdb' : 'thecocktaildb'
  const url = `https://www.${site}.com/api/json/v1/1/filter.php?c=${category}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error fetching data')
  }
}

export const fetchWithSmartSearch = async (type: string, query: string) => {
  let startQuery = 's'
  const site = type === 'meals' ? 'themealdb' : 'thecocktaildb'
  const url = `https://www.${site}.com/api/json/v1/1/search.php?${startQuery}=${query}`

  const response = await fetch(url)
  const data = await response.json()

  if (data[type] === null) {
    startQuery = 'i'
    const url = `https://www.${site}.com/api/json/v1/1/filter.php?${startQuery}=${query}`
    const response = await fetch(url)
    const smartData = await response.json()

    if (smartData[type] === null) {
      return { error: 'Nope' }
    }

    return smartData
  }

  return data
}

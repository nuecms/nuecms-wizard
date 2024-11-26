
export const postData = async (url: string, data: any) => {
  try {
    console.log("Sending data to:", url, data)  // Log the URL and data
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export const getData = async (url: string, params: object = {}) => {
  try {
    if (Object.keys(params).length > 0) {
      url += '?' + serialize(params)
    }
    console.log("Getting data from:", url)  // Log the URL
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export const serialize = (obj: { [key: string]: any }): string => {
  return Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
}

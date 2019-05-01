const stockKey = 'ohlc_selected'

export const getStock = () => {
  return getSessionStorage(stockKey)
}

export const setStock = stock => {
  setSessionStorage(stockKey, stock)
}

// 处理储存session storage
export const setSessionStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value)
    sessionStorage.setItem(key, serializedState)
  } catch (e) {
    console.log(`Error from set session storage: ${key}`)
  }
}

// 处理获取session storage 的数据
export const getSessionStorage = key => {
  try {
    const serializedState = sessionStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

// 处理删除session storage 的数据
export const removeSessionStorage = key => {
  try {
    const serializedState = sessionStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    sessionStorage.removeItem(key)
  } catch (e) {
    return undefined
  }
}

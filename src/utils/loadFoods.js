import foods from '../data/foods.js'

export function loadFoods({ delay = 300, shouldFail = false, empty = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('The BiteCraft menu could not be loaded.'))
        return
      }

      resolve(empty ? [] : foods)
    }, delay)
  })
}

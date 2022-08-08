class LocalCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? window.localStorage : window.sessionStorage
  }
  setItem(key, value) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('type is string of key and key is not null string')
    }
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getItem(key) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('type is string of key and key is not null string')
    }
    return JSON.parse(this.storage.getItem(key))
  }

  deleteItem(key) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('type is string of key and key is not null string')
    }
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
export default new LocalCache()

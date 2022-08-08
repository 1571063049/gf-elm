import axios from 'axios'

// 初始化一个axios实例对象
const request = axios.create({
  baseURL: '/api',
  timeout: 30000
})

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000
})

const get = async function (url, params) {
  const { data } = await request.get(url, {
    params
  })
  return data
}

const post = async function (url, params) {
  const { data } = await request.get(url, params)
  return data
}

export { request, instance, get, post }

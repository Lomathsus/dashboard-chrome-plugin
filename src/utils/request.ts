/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios, { type AxiosError } from 'axios'
import { type Parameter, compile, parse } from 'path-to-regexp'
import { clone } from 'ramda'

const service = axios.create({
  baseURL: '/', // 请求url
  timeout: 30000, // request timeout
  headers: {
    post: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  },
})

// 异常拦截处理器
const errorHandler = (error: AxiosError<{ msg?: string; message?: string }>) => {
  if (error.response) {
    const { data } = error.response
    switch (error.response.status) {
      case 401:
        break
      default:
        break
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
service.interceptors.request.use((config) => {
  // 处理动态 url，将 url 中的 :id 替换为对应的参数
  let { url = '', method = 'GET' } = config
  const opt = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data'
  const originData = config[opt]
  let cloneData = null
  if (Object.prototype.toString.call(originData) !== '[object FormData]') {
    cloneData = clone(originData)
  } else {
    cloneData = originData
  }
  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      domain = urlMatch[0]
      url = url.slice(domain.length)
    }

    const match = parse(url)
    url = compile(url)(originData)

    for (const item of match.tokens) {
      if (isParameter(item) && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domain + url
  } catch (err) {
    console.log(err)
  }

  config.url = url
  config[opt] = cloneData

  return config
}, errorHandler)

// 响应拦截器
service.interceptors.response.use((res) => {
  // 单独对文件进行处理
  const { responseType } = res.config

  if (responseType === 'blob') {
    return {
      data: res.data,
      headers: res.headers,
      code: res.status,
    }
  } else if (
    (res.headers['content-type'] && res.headers['content-type'].indexOf('text/plain') !== -1) ||
    res.headers['content-disposition']
  ) {
    return {
      data: res.data,
      headers: res.headers,
      code: res.status,
    }
  } else {
    return res.data
  }
}, errorHandler)

// 处理动态 url，将 url 中的 :id 替换为对应的参数
export default service

function isParameter(item: any): item is Parameter {
  return typeof item === 'object' && 'name' in item && typeof item.name === 'string'
}

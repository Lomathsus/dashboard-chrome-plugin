import type { AxiosRequestConfig } from 'axios'

import picsum from '@/api/wallpapers/picsum'
import request from '@/utils/request'

type Apis = typeof picsum
type ApiKeys = keyof typeof picsum
type ExtraApiKeys = 'example'

const APIs: { baseUrl?: string; prefix?: string; apis: Apis }[] = [
  {
    baseUrl: 'https://picsum.photos/',
    apis: picsum,
  },
]

interface StandardResponse<R> {
  code: number
  data: R
  headers?: any
  msg?: string
  status?: string
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type AxiosFunc = <Res = any, T = any>(
  params?: T,
  options?: AxiosRequestConfig
) => Promise<StandardResponse<Res>>

const gen = (params: string, prefix?: string, baseUrl?: string): AxiosFunc => {
  let url = prefix ? prefix + params : params
  let method: HttpMethod = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0].toUpperCase() as HttpMethod
    url = prefix ? prefix + paramsArray[1] : paramsArray[1]
  }

  if (method === 'GET' || method === 'DELETE') {
    return function (params, options = {}) {
      return request({
        url,
        params,
        method,
        baseURL: baseUrl,
        ...options,
      })
    }
  }

  return function (data, options = {}) {
    return request({
      url,
      data,
      method,
      baseURL: baseUrl,
      ...options,
    })
  }
}

const APIFunction: Record<ApiKeys | ExtraApiKeys, AxiosFunc> = {} as any

APIs.forEach(({ apis, prefix, baseUrl }) => {
  Object.keys(apis).forEach((key) => {
    APIFunction[key as ApiKeys] = gen(apis[key as keyof typeof apis], prefix, baseUrl)
  })
})

// 证书下载
APIFunction.example = (params) => {
  return request({
    url: `/appm/downloadDblCert`,
    method: 'post',
    responseType: 'blob',
    data: params,
  })
}

export default APIFunction

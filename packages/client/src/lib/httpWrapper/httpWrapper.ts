import axios, { AxiosRequestConfig } from 'axios'
import { isEmpty } from '../utils'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'http://localhost:3004'
// axiosClient.defaults.timeout = appConfig?.HTTP_TIMEOUT

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...config.headers
  }
  return config
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  // const user = getRecoil(currentUserState)

  // if ([401, 403].includes(error.response?.status) && user?.token) {
  //   setRecoil(currentUserState, null)
  // }

  return Promise.reject(error)
})

const addAuthorizationHeader = (token: string | undefined | null, config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (isEmpty(token)) {
    return { ...config }
  }
  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Basic ${token!}`
    }
  }
}

export const httpGet = <D>(url: string, config?: AxiosRequestConfig<D>, token?: string | null) => axiosClient.get(`/${url}`, addAuthorizationHeader(token, config))
export const httpPut = <D>(url: string, body?: D, config?: AxiosRequestConfig<D>, token?: string | null) => axiosClient.put(`/${url}`, body, addAuthorizationHeader(token, config))
export const httpPost = <D>(url: string, body?: D, config?: AxiosRequestConfig<D>, token?: string | null) => axiosClient.post(`/${url}`, body, addAuthorizationHeader(token, config))
export const httpDelete = <D>(url: string, config?: AxiosRequestConfig<D>, token?: string | null) => axiosClient.delete(`/${url}`, addAuthorizationHeader(token, config))
export const httpPatch = <D>(url: string, body?: D, config?: AxiosRequestConfig<D>, token?: string | null) => axiosClient.patch(`/${url}`, body, addAuthorizationHeader(token, config))

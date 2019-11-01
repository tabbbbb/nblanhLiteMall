import request from '@/utils/request'

export function listVip(query) {
  return request({
    url: '/spreadClass/list',
    method: 'get',
    params: query
  })
}

export function createVip(data) {
  return request({
    url: '/spreadClass/create',
    method: 'post',
    data
  })
}

export function readVip(data) {
  return request({
    url: '/spreadClass/read',
    method: 'get',
    data
  })
}

export function updateVip(data) {
  return request({
    url: '/spreadClass/update',
    method: 'post',
    data
  })
}

export function deleteVip(data) {
  return request({
    url: '/spreadClass/delete',
    method: 'post',
    data
  })
}

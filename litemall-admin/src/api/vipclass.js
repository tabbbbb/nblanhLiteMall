import request from '@/utils/request'

export function listVip(query) {
  return request({
    url: '/vipclass/list',
    method: 'get',
    params: query
  })
}

export function createVip(data) {
  return request({
    url: '/vipclass/create',
    method: 'post',
    data
  })
}

export function readVip(data) {
  return request({
    url: '/vipclass/read',
    method: 'get',
    data
  })
}

export function updateVip(data) {
  return request({
    url: '/vipclass/update',
    method: 'post',
    data
  })
}

export function deleteVip(data) {
  return request({
    url: '/vipclass/delete',
    method: 'post',
    data
  })
}

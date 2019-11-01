import request from '@/utils/request'

export function spreadList(query) {
  return request({
    url: '/spread/list',
    method: 'get',
    params: query
  })
}

export function updateSpreadUser(data) {
  return request({
    url: '/spread/update',
    method: 'post',
    data
  })
}

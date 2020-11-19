import {request} from './request'
export function getSongListCatlist() {
  return request({
    url: "playlist/hot",
  })
}
export function getSongList(cat, limit, offset) {
  return request({
    url: "/top/playlist",
    params: {
        cat,
        limit,
        offset,
    }
  })
}
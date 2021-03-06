import { ITEM_INFO, ITEM_RECOMMEND } from '@constants/item'
import { API_ITEM, API_ITEM_RECOMMEND } from '@constants/api'
import { createAction } from '@utils/redux'
import {ROOT_URL} from '@constants/api';
import Taro from '@tarojs/taro'
/**
 * 首页数据
 * @param {*} payload
 */
// export const dispatchItem = payload => createAction({
//   url: API_ITEM,
//   type: ITEM_INFO,
//   payload
// })
export const dispatchItem = payload => createAction({
  url: ROOT_URL + 'goods/message/detail',
  type: ITEM_INFO,
  fetchOptions: {
    anshiModify: true
  },
  payload
})

/**
 * 推荐商品
 * @param {*} payload
 */
export const dispatchItemRecommend = payload => createAction({
  url: API_ITEM_RECOMMEND,
  type: ITEM_RECOMMEND,
  payload
})



function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'cart', data: data['cart'] || JSON.stringify({})})
  ])
}

export const dispatchLocalSet = payload => {
  updateStorage({cart: JSON.stringify(payload)}).then(res => {
    console.log(res)
  })
}

export const dispatchLocalGet = payload => {
  return getStorage()
}

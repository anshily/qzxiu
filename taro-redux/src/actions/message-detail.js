
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchMessageDetail = payload => createAction({
  url: ROOT_URL + 'record/detail',
  type: 'MESSAGE_DETAIL',
  method: 'GET',
  payload
})

export const dispatchSourceShopDetail = payload => createAction({
  url: ROOT_URL + 'shop/message/detail',
  type: 'SOURCE_SHOP_DETAIL',
  method: 'GET',
  payload
})

export const dispatchCurrentShopDetail = payload => createAction({
  url: ROOT_URL + 'shop/message/detail',
  type: 'CURRENT_SHOP_DETAIL',
  method: 'GET',
  payload
})

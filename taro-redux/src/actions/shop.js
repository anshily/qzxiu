
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchShop = payload => createAction({
  url: ROOT_URL + 'shop',
  type: 'SHOP_ADD',
  method: 'POST',
  payload
})
export const dispatchShopInit = payload => createAction({
  url: ROOT_URL + 'shop/message/detail',
  type: 'SHOP_INIT',
  method: 'GET',
  fetchOptions: {
    anshiModify: true
  },
  payload
})

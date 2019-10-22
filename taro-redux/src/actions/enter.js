import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchENTER = payload => createAction({
  url: ROOT_URL + 'shop/message/saveUserAndShopMessageAndGrading',
  type: 'SHOP_ENTER',
  method: 'POST',
  payload
})
export const dispatchRecommend = payload => createAction({
  url: ROOT_URL + `shop/message/getRecommendAndPosition`,
  type: 'ENTER_RECOMMEND',
  method: 'GET',
  fetchOptions: {
    anshiModify: true
  },
  payload
})
export const dispatchTypeList = payload => createAction({
  url: ROOT_URL + `shop/type/getTypeList`,
  type: 'ENTER_TYPE_LIST',
  method: 'GET',
  fetchOptions: {
    anshiModify: true
  },
  payload
})


import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchOrderDetail = payload => createAction({
  url: ROOT_URL + 'order/selectOrderMessageByOrderid',
  type: 'ORDER_DETAIL',
  method: 'GET',
  payload
})
export const dispatchOrderCancel = payload => createAction({
  url: ROOT_URL + 'order/cancelOrder',
  type: 'ORDER_CANCEL',
  method: 'GET',
  payload
})

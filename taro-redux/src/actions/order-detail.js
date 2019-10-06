
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchOrderDetail = payload => createAction({
  url: ROOT_URL + 'order/selectOrderMessageByOrderid',
  type: 'ORDER_DETAIL',
  method: 'GET',
  payload
})

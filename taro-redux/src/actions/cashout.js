
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchCashout = payload => createAction({
  url: ROOT_URL + 'shop/message/getCashOut',
  type: 'CASHOUT_ADD',
  method: 'POST',
  payload
})

export const dispatchDetail = payload => createAction({
  url: ROOT_URL + 'cashout',
  type: 'CASHOUT_ADD',
  method: 'POST',
  payload
})

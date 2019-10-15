
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchAllowance = payload => createAction({
  url: ROOT_URL + 'shop/message/list',
  type: 'ALLOWANCE_LIST',
  method: 'GET',
  fetchOptions: {
    anshiModify: true
  },
  payload
})

export const dispatchCashout = payload => createAction({
  url: ROOT_URL + 'shop/message/getCashOut',
  type: 'ALLOWANCE_CASHOUT',
  method: 'POST',
  payload
})

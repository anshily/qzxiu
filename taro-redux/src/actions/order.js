import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchOrder = payload => createAction({
  url: ROOT_URL + 'order/shopCar',
  type: 'ORDER_ADD',
  method: 'POST',
  fetchOptions: {
    anshiModify: true
  },
  payload
})

export const dispatchOrderSet = payload => createAction({
  url: ROOT_URL + 'order/getOrderByStatu',
  type: 'ORDER_SET',
  fetchOptions: {
    anshiModify: true
  },
  payload
})

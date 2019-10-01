import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchOrder = payload => createAction({
  url: ROOT_URL + 'order',
  type: 'ORDER_ADD',
  method: 'POST',
  payload
})

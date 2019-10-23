
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchMessage = payload => createAction({
  url: ROOT_URL + 'message',
  type: 'MESSAGE_ADD',
  method: 'POST',
  payload
})

export const dispatchMessageList = payload => createAction({
  url: ROOT_URL + 'record/getRecordByShopid',
  type: 'MESSAGES',
  method: 'GET',
  payload
})

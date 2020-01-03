
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchContact = payload => createAction({
  url: ROOT_URL + 'contact',
  type: 'CONTACT_ADD',
  method: 'POST',
  payload
})
export const dispatchMessageList = payload => createAction({
  url: ROOT_URL + 'form/selectByStatu',
  type: 'CONTACT_MESSAGES',
  method: 'GET',
  payload
})
export const dispatchRead = payload => createAction({
  url: ROOT_URL + 'form/readOrDelete',
  type: 'CONTACT_READ',
  method: 'GET',
  payload
})

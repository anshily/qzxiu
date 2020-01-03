
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchContact = payload => createAction({
  url: ROOT_URL + 'contact',
  type: 'CONTACT_ADD',
  method: 'POST',
  payload
})
export const dispatchMessageList = payload => createAction({
  url: ROOT_URL + 'form/list',
  type: 'CONTACT_MESSAGES',
  method: 'GET',
  payload
})
export const propsdispatchRead = payload => createAction({
  url: ROOT_URL + 'form/readOrDelete',
  type: 'CONTACT_READ',
  method: 'POST',
  payload
})

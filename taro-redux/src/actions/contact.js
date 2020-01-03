
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchContact = payload => createAction({
  url: ROOT_URL + 'contact',
  type: 'CONTACT_ADD',
  method: 'POST',
  payload
})

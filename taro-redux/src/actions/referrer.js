
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchREFERRER = payload => createAction({
  url: ROOT_URL + 'referrer',
  type: 'REFERRER_ADD',
  method: 'POST',
  payload
})

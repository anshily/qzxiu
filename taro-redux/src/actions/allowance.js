
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchAllowance = payload => createAction({
  url: ROOT_URL + 'allowance',
  type: 'ALLOWANCE_ADD',
  method: 'POST',
  payload
})

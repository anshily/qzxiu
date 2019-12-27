
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchReferrerLevelUpper = payload => createAction({
  url: ROOT_URL + 'referrerLevelUpper',
  type: 'REFERRER-LEVEL-UPPER_ADD',
  method: 'POST',
  payload
})

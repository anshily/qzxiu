
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchReferrerLevelOne = payload => createAction({
  url: ROOT_URL + 'referrerLevelOne',
  type: 'REFERRER-LEVEL-ONE_ADD',
  method: 'POST',
  payload
})

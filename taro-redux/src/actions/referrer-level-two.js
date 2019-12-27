
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchReferrerLevelTwo = payload => createAction({
  url: ROOT_URL + 'referrerLevelTwo',
  type: 'REFERRER-LEVEL-TWO_ADD',
  method: 'POST',
  payload
})

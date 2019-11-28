
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchActivityDetail = payload => createAction({
  url: ROOT_URL + 'activity/detail',
  type: 'ACTIVITY-DETAIL',
  method: 'GET',
  payload
})

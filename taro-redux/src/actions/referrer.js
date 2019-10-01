
import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchREFERRER = payload => createAction({
  url: ROOT_URL + 'referrer',
  type: 'REFERRER_ADD',
  method: 'POST',
  payload
})

export const dispatchChild = payload => createAction({
  url: ROOT_URL + 'shop/message/getChildShopMessage',
  type: 'REFERRER_CHILD',
  fetchOptions: {
    anshiModify: true
  },
  payload
})

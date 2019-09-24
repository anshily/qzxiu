import {createAction} from '@utils/redux';
import {ROOT_URL} from '@constants/api';

export const dispatchENTER = payload => createAction({
  url: ROOT_URL + 'shop/message/saveUserAndShopMessageAndGrading',
  type: 'SHOP_ENTER',
  method: 'POST',
  payload
})

import { createAction } from '@utils/redux';

export const dispatchENTER = payload => createAction({
  url: 'add',
  type: 'SHOP_ENTER',
  payload
})

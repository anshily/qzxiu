
const INITIAL_STATE = {
  orderDetail : {},
}

export default function orderDetail(state = {}, action) {
  switch(action.type) {
    case 'ORDER_DETAIL': {
      const orderDetail = action.payload
      return { ...state, orderDetail: orderDetail }
    }
    default:
      return state
  }
}

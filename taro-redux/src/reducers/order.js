
const INITIAL_STATE = {
  orderItem: {},
}

export default function order(state = {}, action) {
  switch(action.type) {
    case 'ORDER_ADD': {
      const { orderItem } = action.payload
      return { ...state, orderItem: orderItem }
    }
    default:
      return state
  }
}

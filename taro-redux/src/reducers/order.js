
const INITIAL_STATE = {
  orderItem: {},
  orderList: []
}

export default function order(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ORDER_ADD': {
      const res = action.payload;
      return { ...state, res}
    }
    case 'ORDER_SET': {
      return { ...state, orderList: action.payload }
    }
    default:
      return state
  }
}

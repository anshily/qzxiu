
const INITIAL_STATE = {
  cashoutItem: {},
}

export default function cashout(state = {}, action) {
  switch(action.type) {
    case 'CASHOUT_ADD': {
      const cashoutItem = action.payload
      return { ...state, cashoutItem: cashoutItem }
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  allowanceItem: {},
}

export default function allowance(state = {}, action) {
  switch(action.type) {
    case 'ALLOWANCE_LIST': {
      const allowanceItem = action.payload
      return { ...state, allowanceItem: allowanceItem }
    }
    default:
      return state
  }
}

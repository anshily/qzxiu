
const INITIAL_STATE = {
  allowanceItem: {},
  allowanceList: []
}

export default function allowance(state = {}, action) {
  switch(action.type) {
    case 'ALLOWANCE_LIST': {
      const allowanceItem = action.payload
      return { ...state, allowanceItem: allowanceItem, allowanceList: allowanceItem.list }
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  referrerLevelUpperItem: {},
}

export default function referrerLevelUpper(state = {}, action) {
  switch(action.type) {
    case 'REFERRER-LEVEL-UPPER_ADD': {
      const { referrerLevelUpperItem } = action.payload
      return { ...state, referrerLevelUpperItem: referrerLevelUpperItem }
    }
    default:
      return state
  }
}

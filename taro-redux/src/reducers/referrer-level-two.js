
const INITIAL_STATE = {
  referrerLevelTwoItem: {},
}

export default function referrerLevelTwo(state = {}, action) {
  switch(action.type) {
    case 'REFERRER-LEVEL-TWO_ADD': {
      const { referrerLevelTwoItem } = action.payload
      return { ...state, referrerLevelTwoItem: referrerLevelTwoItem }
    }
    default:
      return state
  }
}

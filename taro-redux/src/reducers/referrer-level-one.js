
const INITIAL_STATE = {
  referrerLevelOneItem: {},
}

export default function referrerLevelOne(state = {}, action) {
  switch(action.type) {
    case 'REFERRER-LEVEL-ONE_ADD': {
      const { referrerLevelOneItem } = action.payload
      return { ...state, referrerLevelOneItem: referrerLevelOneItem }
    }
    default:
      return state
  }
}

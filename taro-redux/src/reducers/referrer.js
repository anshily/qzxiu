
const INITIAL_STATE = {
  referrerItem: {},
}

export default function referrer(state = {}, action) {
  switch(action.type) {
    case 'REFERRER_ADD': {
      const { referrerItem } = action.payload
      return { ...state, referrerItem: referrerItem }
    }
    default:
      return state
  }
}

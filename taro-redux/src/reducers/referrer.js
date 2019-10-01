
const INITIAL_STATE = {
  referrerItem: {},
}

export default function referrer(state = {}, action) {
  switch(action.type) {
    case 'REFERRER_ADD': {
      const { referrerItem } = action.payload
      return { ...state, referrerItem: referrerItem }
    }
    case 'REFERRER_CHILD': {
      console.log(action.payload)
      return { ...state }
    }
    default:
      return state
  }
}

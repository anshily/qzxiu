
const INITIAL_STATE = {
  messageItem: {},
}

export default function message(state = {}, action) {
  switch(action.type) {
    case 'MESSAGE_ADD': {
      const { messageItem } = action.payload
      return { ...state, messageItem: messageItem }
    }
    default:
      return state
  }
}

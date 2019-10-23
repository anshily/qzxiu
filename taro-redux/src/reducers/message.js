
const INITIAL_STATE = {
  messageItem: {},
  messages: [],
}

export default function message(state = {}, action) {
  switch(action.type) {
    case 'MESSAGE_ADD': {
      const messageItem = action.payload
      return { ...state, messageItem: messageItem }
    }
    case 'MESSAGES': {
      const messages = action.payload
      return { ...state, messages: messages }
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  contactItem: {},
}

export default function contact(state = {}, action) {
  switch(action.type) {
    case 'CONTACT_ADD': {
      const { contactItem } = action.payload
      return { ...state, contactItem: contactItem }
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  contactItem: {},
  contactList: []
}

export default function contact(state = {}, action) {
  switch(action.type) {
    case 'CONTACT_ADD': {
      const { contactItem } = action.payload
      return { ...state, contactItem: contactItem }
    }
    case 'CONTACT_MESSAGES': {
      const  contactList  = action.payload
      return { ...state, contactList: contactList.list }
    }
    default:
      return state
  }
}

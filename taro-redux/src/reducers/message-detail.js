
const INITIAL_STATE = {
  messageDetailItem: {},
  sourceShopDetailItem: {},
  currentShopDetailItem: {}
}

export default function messageDetail(state = {}, action) {
  switch(action.type) {
    case 'MESSAGE_DETAIL': {
      const messageDetailItem = action.payload
      return { ...state, messageDetailItem: messageDetailItem }
    }
    case 'SOURCE_SHOP_DETAIL': {
      const sourceShopDetailItem = action.payload
      return { ...state, sourceShopDetailItem: sourceShopDetailItem }
    }
    case 'CURRENT_SHOP_DETAIL': {
      const currentShopDetailItem = action.payload
      return { ...state, currentShopDetailItem: currentShopDetailItem }
    }
    default:
      return state
  }
}

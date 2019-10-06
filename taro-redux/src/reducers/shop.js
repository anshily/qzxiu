
const INITIAL_STATE = {
  shopItem: {},
}

export default function shop(state = {}, action) {
  switch(action.type) {
    case 'SHOP_INIT': {
      const shopItem = action.payload;
      console.log(shopItem);
      return { ...state, shopItem: shopItem }
    }
    default:
      return state
  }
}

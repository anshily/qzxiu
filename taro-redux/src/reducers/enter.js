const INITIAL_STATE = {
  user: {},
  shopMessage: {},
  recommendID: '',
  positionID: ''
}

export default function enter(state = {}, action) {
  switch(action.type) {
    case 'SHOP_ENTER': {
      console.log('reducer',action)
      return { ...state, res: action.payload }
    }
    case 'ENTER_RECOMMEND': {
      return {
        ...state,
        recommendList: action.payload
      }
    }
    // case CATE_SUB_LIST: {
    //   const { id, itemList } = action.payload
    //   return {
    //     ...state,
    //     subCategory: { ...state.subCategory, [id]: itemList }
    //   }
    // }
    default:
      return state
  }
}

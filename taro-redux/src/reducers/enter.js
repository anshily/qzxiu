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
    case 'ENTER_TYPE_LIST': {
      console.log(action.payload)
      return {
        ...state,
        typeList: action.payload
      }
    }
    case 'ENTER_DAI_LIST': {
      console.log(action.payload)
      return {
        ...state,
        dailiList: action.payload.map(item => {
          item['shopname'] = item['username'] + ' ' + item['shopname'];
          return item;
        })
      }
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  referrerItem: {},
  referrerLevelOne: [],
  referrerLevelTwo: []
}

export default function referrerLevelOne(state = {}, action) {
  switch(action.type) {
    case 'REFERRER_ONE_ADD': {
      const { referrerItem } = action.payload
      return { ...state, referrerItem: referrerItem }
    }
    case 'REFERRER_ONE_DETAIL': {
      const item = action.payload;
      console.log(action.payload)
      return { ...state, referrerShopItem: item }
    }
    case 'REFERRER_ONE_CHILD': {
      console.log(action.payload.child)
      let list = action.payload.child;
      let levelList1 = [];
      let levelList2 = [];
      list.forEach(item => {
        // recommmend_type: "地区推荐"
        if (item.recommmend_type == '地区推荐'){
          levelList1.push(item)
        }else {
          levelList2.push(item)
        }
      })
      return { ...state,  referrerOne: levelList1, referrerTwo: levelList2}
    }
    default:
      return state
  }
}


const INITIAL_STATE = {
  referrerItem: {},
  referrerLevelOne: [],
  referrerLevelTwo: []
}

export default function referrer(state = {}, action) {
  switch(action.type) {
    case 'REFERRER_ADD': {
      const { referrerItem } = action.payload
      return { ...state, referrerItem: referrerItem }
    }
    case 'REFERRER_DETAIL': {
      const item = action.payload;
      // console.log(action.payload)
      return { ...state, referrerShopItem: item }
    }
    case 'REFERRER_CHILD': {
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
      return { ...state,  referrerLevelOne: levelList1, referrerLevelTwo: levelList2}
    }
    default:
      return state
  }
}

import {
  HOME_INFO, HOME_SEARCH_COUNT, HOME_RECOMMEND, HOME_PIN
} from '@constants/home'
import {IMG_URL} from '@constants/api';
import {ROOT_URL} from "../constants/api";
const INITIAL_STATE = {
  homeInfo: {},
  searchCount: 0,
  banner: [],
  pin: [],
  recommend: [],
  goodShops: []
}

export default function home(state = INITIAL_STATE, action) {
  switch(action.type) {
    case HOME_INFO: {
      return {
        ...state,
        homeInfo: action.payload
      }
    }
    case HOME_SEARCH_COUNT: {
      return {
        ...state,
        searchCount: action.payload.count
      }
    }
    case HOME_PIN: {
      // 每3个分成一组
      const pin = []
      console.log(action.payload.goodShopList)
      action.payload.goodShopList.forEach((item, index) => {
        const groupIndex = parseInt(index / 3)
        if (!pin[groupIndex]) {
          pin[groupIndex] = []
        }
        pin[groupIndex].push(item)
      })
      return { ...state, pin }
    }
    case HOME_RECOMMEND: {
      console.log(action.payload);
      let list = action.payload.list.map(item => {
        item['type'] = 1;
        item['categoryItem'] = {
          listPicUrl: IMG_URL + item['goodspicture'],
          name: item['goodsname'],
          retailPrice: item['goodsprice']
        }
        return item;
      })
      return {
        ...state,
        recommend: state.recommend.concat(list)
      }
    }
    case 'HOME_BANNER': {
      console.log(action.payload)
      let list = action.payload.map((item, index) => {
          item['img'] = IMG_URL + item['picture_address'],
          item['rank'] = index
        return item;
      })
      return {
        ...state,
        banner: list
      }
    }
    case 'HOME_GSHOP': {
      console.log(action.payload.goodShopList)
      return {
        ...state,
        goodShops: action.payload.goodShopList}
    }
    default:
      return state
  }
}

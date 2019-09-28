import { ITEM_INFO, ITEM_RECOMMEND } from '@constants/item'
import {IMG_URL} from "../constants/api";

const INITIAL_STATE = {
  itemInfo: {}
}

export default function item(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ITEM_INFO: {
      let tmp = action.payload;
      console.log(tmp)
      return {
        ...state,
        itemInfo: {
          id: tmp['id'],
          listPicUrl: IMG_URL + tmp['goodspicture'],
          name: tmp['goodsname'],
          activityPrice: tmp['goodsprice'],
          itemDetail: {
            name: tmp['goodsname'],
            detailHtml: tmp['represent']
          }
        }
      }
    }
    case ITEM_RECOMMEND: {
      return { ...state }
    }
    default:
      return state
  }
}

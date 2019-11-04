import {IMG_URL} from "@constants/api";

const INITIAL_STATE = {
  orderDetail : {},
}

export default function orderDetail(state = {}, action) {
  switch(action.type) {
    case 'ORDER_DETAIL': {
      // goodsMessage:
      //   createtime: null
      // goodsname: "图片详情"
      // goodspicture: "../uploads/assets/index1.jpg"
      // goodsprice: 123456
      // id: 4
      // represent: "<p>图片简介</p><p><br></p><p><br></p><p><img src="http://localhost:8081/../uploads/assets/index1.jpg"></p>"
      //   statu: 1
      // updatetime: null
      // __proto__: Object
      // quantity: 1
      // const orderDetail = action.payload
      let list = [];
      let price = 0;
      action.payload.forEach(item => {
        list.push({
          id: item['goodsMessage']['id'],
          pic: IMG_URL + item['goodsMessage']['goodspicture'],
          itemName: item['goodsMessage']['goodsname'],
          actualPrice: item['goodsMessage']['goodsprice'],
          cnt: item['quantity']
        })
        price += item['goodsMessage']['goodsprice'];
      })
      return { ...state, orderDetail: {
          list: list,
          sumPrice: price,
          sumCnt: list.length
        } }
    }
    case 'ORDER_CANCEL': {
      console.log(action.payload)
      return { ...state }
    }
    default:
      return state
  }
}

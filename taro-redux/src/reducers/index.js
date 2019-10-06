import { combineReducers } from 'redux'
import cate from './cate'
import cart from './cart'
import home from './home'
import item from './item'
import user from './user'
import enter from './enter'
import referrer from './referrer'
import order from './order'
import shop from './shop'
import orderDetail from './order-detail'

export default combineReducers({
  home,
  cate,
  cart,
  item,
  user,
  enter,
  referrer,
  order,
  shop,
  orderDetail
})

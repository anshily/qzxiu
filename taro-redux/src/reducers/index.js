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
import allowance from './allowance'
import message from './message'
import messageDetail from './message-detail'
import activityDetail from './activity-detail'
import cashout from './cashout'
import referrerLevelOne from './referrer-level-one'
import referrerLevelTwo from './referrer-level-two'

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
  orderDetail,
  message,
  allowance,
  cashout,
  messageDetail,
  activityDetail,
  referrerLevelOne,
  referrerLevelTwo
})

import { combineReducers } from 'redux'
import cate from './cate'
import cart from './cart'
import home from './home'
import item from './item'
import user from './user'
import enter from './enter'

export default combineReducers({
  home,
  cate,
  cart,
  item,
  user,
  enter
})

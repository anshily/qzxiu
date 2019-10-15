import { USER_INFO, USER_LOGIN, USER_LOGOUT } from '@constants/user'
import { API_USER, API_USER_LOGIN } from '@constants/api'
import { createAction } from '@utils/redux'
import {ROOT_URL} from '@constants/api';

/**
 * 获取用户信息
 * @param {*} payload
 */
export const dispatchUser = payload => createAction({
  url: API_USER,
  fetchOptions: {
    showToast: false,
    autoLogin: false
  },
  type: USER_INFO,
  payload
})

/**
 * 用户登录
 * @param {*} payload
 */
export const dispatchLogin = payload => createAction({
  url: ROOT_URL + 'user/login',
  type: USER_LOGIN,
  method: 'POST',
  payload
})

/**
 * 用户code登录
 * @param {*} payload
 */
export const dispatchCodeLogin = payload => createAction({
  url: ROOT_URL + 'user/accordingCodeGetToken',
  type: 'USER_CODE_LOGIN',
  method: 'GET',
  payload
})

/**
 * 用户退出登录
 */
export const dispatchLogout = () => ({ type: USER_LOGOUT })

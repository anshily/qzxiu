import Taro from '@tarojs/taro'
import { USER_INFO, USER_LOGIN, USER_LOGOUT } from '@constants/user'

const INITIAL_STATE = {
  userInfo: {}
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_INFO: {
      return {
        ...state,
        userInfo: {
          ...action.payload,
          login: true
        }
      }
    }
    case USER_LOGIN: {
      console.log(action.payload)
      Taro.setStorage({ key: 'user_token', data: action.payload.token});
      return { ...state }
    }
    case 'USER_CODE_LOGIN': {
      console.log(action.payload)
      Taro.setStorage({ key: 'user_token', data: action.payload.token});
      Taro.setStorage({ key: 'user_role', data: action.payload.token});
      Taro.setStorage({ key: 'user_id', data: action.payload.token});
      return { ...state }
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      }
    }
    default:
      return state
  }
}

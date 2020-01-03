import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import 'taro-ui/dist/style/index.scss'
import {ROOT_URL} from '@constants/api';
import authReload from '@utils/auth';
import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/home/home',
      'pages/enter/enter',
      'pages/referrer/referrer',
      'pages/referrer-level-one/referrer-level-one',
      'pages/referrer-level-two/referrer-level-two',
      'pages/referrer-level-upper/referrer-level-upper',
      'pages/cate/cate',
      'pages/cate-sub/cate-sub',
      'pages/cart/cart',
      'pages/user/user',
      'pages/user-login/user-login',
      'pages/user-login-email/user-login-email',
      'pages/item/item',
      'pages/order/order',
      'pages/webview/webview',
      'pages/shop/shop',
      'pages/order-detail/order-detail',
      'pages/message/message',
      'pages/allowance/allowance',
      'pages/cashout/cashout',
      'pages/activity-detail/activity-detail',
      'pages/contact/contact',
      'pages/message-detail/message-detail'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '网易严选',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "首页"
      }, {
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/cate.png",
        selectedIconPath: "./assets/tab-bar/cate-active.png",
        text: "商品"
      }, {
        pagePath: "pages/cart/cart",
        iconPath: "./assets/tab-bar/cart.png",
        selectedIconPath: "./assets/tab-bar/cart-active.png",
        text: "购物车"
      }, {
        pagePath: "pages/user/user",
        iconPath: "./assets/tab-bar/user.png",
        selectedIconPath: "./assets/tab-bar/user-active.png",
        text: "个人"
      }]
    }
  }

  componentDidMount () {
    authReload().then( () => {
      console.log(5);
      console.log('resolve');
    })
    // Taro.login().then(res => {
    //   // console.log(res)
    //   Taro.request({
    //     url: ROOT_URL + 'user/accordingCodeGetToken',
    //     method: 'GET',
    //     data: {
    //       code: res['code']
    //     }
    //   }).then( info => {
    //     console.log(info)
    //     let data = info['data']
    //     if (data['code'] == 0){
    //       Taro.setStorage({ key: 'user_token', data: data['data']['token']});
    //       Taro.setStorage({ key: 'user_role', data: data['data']['rolename']});
    //       Taro.setStorage({ key: 'user_id', data: data['data']['id']});
    //       this.getShop(data['data']['token'])
    //     }
    //     }
    //   )
    // })
  }

  getShop(token) {
    Taro.request({
      url: ROOT_URL + 'user/accordingTokenGetShop',
      method: 'GET',
      data: {
        token: token
      }
    }).then(res => {
      console.log(res);
      let data = res['data'];
      if (data['code'] == 0 && data['data']){
        Taro.setStorageSync('shopInfo',data['data']);
        Taro.setStorageSync('shopId',data['data']['id']);
      }
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
